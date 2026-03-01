import { type User, type InsertUser, type Product, type InsertProduct, users, products, pageViews, visitorEvents } from "@shared/schema";
import { db } from "./db";
import { eq, ne, gte, lte, and, sql } from "drizzle-orm";

// Lightweight product type for grid view (no large image data)
export interface ProductGridItem {
  id: number;
  name: string;
  modelNumber: string;
  brand: string;
  series: string[];
  subSeries: string[] | null;
  image: string | null;
}

export interface TrackPayload {
  page: string;
  productId?: number;
  productName?: string;
  ip: string;
  country?: string;
  city?: string;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getProducts(): Promise<Product[]>;
  getProductsForGrid(): Promise<ProductGridItem[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getRelatedProducts(productId: number, limit?: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: InsertProduct): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Analytics
  trackView(payload: TrackPayload): Promise<void>;
  getProductAnalytics(from: Date, to: Date): Promise<{ name: string; views: number }[]>;
  getGeoAnalytics(from: Date, to: Date): Promise<{
    countries: { name: string; visitors: number }[];
    cities: { name: string; visitors: number }[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  // Optimized query for grid view - only selects essential fields (no image data)
  async getProductsForGrid(): Promise<ProductGridItem[]> {
    return await db.select({
      id: products.id,
      name: products.name,
      modelNumber: products.modelNumber,
      brand: products.brand,
      series: products.series,
      subSeries: products.subSeries,
      image: products.image,
    }).from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getRelatedProducts(productId: number, limit: number = 4): Promise<Product[]> {
    const product = await this.getProduct(productId);
    if (!product) return [];

    const allProducts = await db.select().from(products).where(ne(products.id, productId));

    const scored = allProducts.map(p => {
      let score = 0;
      const productSeries = product.series || [];
      const pSeries = p.series || [];
      if (pSeries.some(s => productSeries.includes(s))) score += 2;
      if (p.brand === product.brand) score += 1;
      return { product: p, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(s => s.product);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: InsertProduct): Promise<Product | undefined> {
    const [updated] = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  // ── Analytics ──────────────────────────────────────────────────────────────

  async trackView(payload: TrackPayload): Promise<void> {
    const now = new Date();
    // Insert page view (product views only logged when productId present)
    if (payload.productId) {
      await db.insert(pageViews).values({
        productId: payload.productId,
        productName: payload.productName ?? null,
        page: payload.page,
        timestamp: now,
      });
    }
    // Always insert visitor geo event
    await db.insert(visitorEvents).values({
      country: payload.country ?? null,
      city: payload.city ?? null,
      ip: payload.ip,
      page: payload.page,
      timestamp: now,
    });
  }

  async getProductAnalytics(from: Date, to: Date): Promise<{ name: string; views: number }[]> {
    const rows = await db
      .select({
        name: pageViews.productName,
        views: sql<number>`cast(count(*) as int)`,
      })
      .from(pageViews)
      .where(and(gte(pageViews.timestamp, from), lte(pageViews.timestamp, to)))
      .groupBy(pageViews.productName)
      .orderBy(sql`count(*) desc`)
      .limit(20);

    return rows.map(r => ({ name: r.name ?? "Unknown", views: r.views }));
  }

  async getGeoAnalytics(from: Date, to: Date): Promise<{
    countries: { name: string; visitors: number }[];
    cities: { name: string; visitors: number }[];
  }> {
    const [countryRows, cityRows] = await Promise.all([
      db
        .select({
          name: visitorEvents.country,
          visitors: sql<number>`cast(count(*) as int)`,
        })
        .from(visitorEvents)
        .where(and(gte(visitorEvents.timestamp, from), lte(visitorEvents.timestamp, to)))
        .groupBy(visitorEvents.country)
        .orderBy(sql`count(*) desc`)
        .limit(20),

      db
        .select({
          name: visitorEvents.city,
          visitors: sql<number>`cast(count(*) as int)`,
        })
        .from(visitorEvents)
        .where(and(gte(visitorEvents.timestamp, from), lte(visitorEvents.timestamp, to)))
        .groupBy(visitorEvents.city)
        .orderBy(sql`count(*) desc`)
        .limit(20),
    ]);

    return {
      countries: countryRows.map(r => ({ name: r.name ?? "Unknown", visitors: r.visitors })),
      cities: cityRows.map(r => ({ name: r.name ?? "Unknown", visitors: r.visitors })),
    };
  }
}

export const storage = new DatabaseStorage();
