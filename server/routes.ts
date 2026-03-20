import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema } from "@shared/schema";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import { createRequest, getRequests, approveRequest, redeemCode, seedPermanentCodes } from "./catalogue-store";
import { sendRequestConfirmation, sendDownloadCode } from "./mailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Uploads dir sits at project root (/../uploads relative to dist/server.js)
const UPLOADS_DIR = path.resolve(__dirname, "..", "uploads");


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Seed permanent per-catalogue download codes on every startup (idempotent)
  seedPermanentCodes();

  // Get all products for grid view (optimized - only essential fields)
  app.get("/api/products/grid", async (req, res) => {
    try {
      const products = await storage.getProductsForGrid();
      res.set('Cache-Control', 'no-cache, must-revalidate');
      res.json(products);
    } catch (error) {
      console.error("Error fetching products for grid:", error);
      res.status(500).json({ error: "Failed to fetch products", details: String(error) });
    }
  });

  // Get all products (full data - for admin)
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.set('Cache-Control', 'no-cache, must-revalidate');
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products", details: String(error) });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.set('Cache-Control', 'no-cache, must-revalidate');
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Get related products (with caching)
  app.get("/api/products/:id/related", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const limit = parseInt(req.query.limit as string) || 4;
      const relatedProducts = await storage.getRelatedProducts(id, limit);
      res.set('Cache-Control', 'no-cache, must-revalidate');
      res.json(relatedProducts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch related products" });
    }
  });

  // Create product
  app.post("/api/products", async (req, res) => {
    try {
      const parsed = insertProductSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid product data", details: parsed.error });
      }
      const product = await storage.createProduct(parsed.data);
      res.status(201).json(product);
    } catch (error: any) {
      console.error("Failed to create product DB error:", error);
      res.status(500).json({ error: `Failed to create product: ${error.message || String(error)}` });
    }
  });

  // Update product
  app.patch("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const parsed = insertProductSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid product data", details: parsed.error });
      }
      const product = await storage.updateProduct(id, parsed.data);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  // Delete product
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProduct(id);
      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // PUT/PATCH product (full update)
  const updateProductHandler = async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);
      console.log("Update request for product", id);
      console.log("images count:", req.body.images?.length || 0);
      console.log("technicalDrawings count:", req.body.technicalDrawings?.length || 0);
      console.log("catalogueUrl:", req.body.catalogueUrl ? "present" : "empty");
      const parsed = insertProductSchema.safeParse(req.body);
      if (!parsed.success) {
        console.error("Validation failed:", parsed.error);
        return res.status(400).json({ error: "Invalid product data", details: parsed.error });
      }
      const product = await storage.updateProduct(id, parsed.data);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Failed to update product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  };

  app.put("/api/products/:id", updateProductHandler);

  // Upload image to disk — saves WebP file, returns { url }
  app.post("/api/upload-image", async (req, res) => {
    try {
      console.log(`[Upload Image] Received request: body size = ${req.body?.image?.length} chars`);
      const { image, maxWidth = 800, quality = 70 } = req.body;
      if (!image || typeof image !== 'string') {
        console.error(`[Upload Image] No valid image provided. req.body keys = ${Object.keys(req.body)}`);
        return res.status(400).json({ error: "No image provided" });
      }
      const matches = image.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: "Invalid base64 image format" });
      }
      const imageBuffer = Buffer.from(matches[2], 'base64');
      const compressed = await sharp(imageBuffer)
        .resize(maxWidth, null, { withoutEnlargement: true })
        .webp({ quality: quality, effort: 4 })
        .toBuffer();

      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      }
      const filename = `${randomUUID()}.webp`;
      fs.writeFileSync(path.join(UPLOADS_DIR, filename), compressed);

      res.json({
        url: `/uploads/${filename}`,
        originalSize: imageBuffer.length,
        newSize: compressed.length,
        savings: `${Math.round((1 - compressed.length / imageBuffer.length) * 100)}%`
      });
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });

  // Compress image endpoint (returns base64, kept for compatibility)
  app.post("/api/compress-image", async (req, res) => {
    try {
      const { image, maxWidth = 800, quality = 70 } = req.body;

      if (!image || typeof image !== 'string') {
        return res.status(400).json({ error: "No image provided" });
      }

      // Extract base64 data
      const matches = image.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: "Invalid base64 image format" });
      }

      const imageBuffer = Buffer.from(matches[2], 'base64');

      // Compress and convert to WebP with sharp
      const compressed = await sharp(imageBuffer)
        .resize(maxWidth, null, { withoutEnlargement: true })
        .webp({ quality: quality, effort: 4 })
        .toBuffer();

      const compressedBase64 = `data:image/webp;base64,${compressed.toString('base64')}`;

      const originalSize = imageBuffer.length;
      const newSize = compressed.length;
      const savings = Math.round((1 - newSize / originalSize) * 100);

      res.json({
        image: compressedBase64,
        originalSize,
        newSize,
        savings: `${savings}%`
      });
    } catch (error) {
      console.error("Image compression error:", error);
      res.status(500).json({ error: "Failed to compress image" });
    }
  });

  // ── Analytics ──────────────────────────────────────────────────────────────

  // POST /api/track — called by client on product opens & page visits
  app.post("/api/track", async (req, res) => {
    try {
      const { page, productId, productName } = req.body as {
        page: string;
        productId?: number;
        productName?: string;
      };

      // Extract real IP (trust Nginx X-Forwarded-For)
      const raw = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
      const ip = (Array.isArray(raw) ? raw[0] : raw.split(",")[0]).trim();

      let country: string | undefined;
      let city: string | undefined;

      // Geo lookup — skip for localhost / private IPs
      const isPrivate = /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1$)/.test(ip);
      if (!isPrivate && ip !== "unknown") {
        try {
          const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`);
          if (geoRes.ok) {
            const geo = await geoRes.json() as { country?: string; city?: string };
            country = geo.country;
            city = geo.city;
          }
        } catch {
          // geo lookup failure is non-fatal
        }
      }

      await storage.trackView({ page, productId, productName, ip, country, city });
      res.json({ ok: true });
    } catch (error) {
      console.error("Track error:", error);
      res.status(500).json({ error: "Failed to track" });
    }
  });

  // GET /api/analytics/products?from=ISO&to=ISO
  app.get("/api/analytics/products", async (req, res) => {
    try {
      const to = req.query.to ? new Date(req.query.to as string) : new Date();
      const from = req.query.from
        ? new Date(req.query.from as string)
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const data = await storage.getProductAnalytics(from, to);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product analytics" });
    }
  });

  // GET /api/analytics/geo?from=ISO&to=ISO
  app.get("/api/analytics/geo", async (req, res) => {
    try {
      const to = req.query.to ? new Date(req.query.to as string) : new Date();
      const from = req.query.from
        ? new Date(req.query.from as string)
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const data = await storage.getGeoAnalytics(from, to);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch geo analytics" });
    }
  });

  // ── Catalogue Request System ──────────────────────────────────────────────

  // POST /api/catalogue-request — user submits request
  app.post("/api/catalogue-request", async (req, res) => {
    try {
      const { name, email, company, comment, catalogueUrl, catalogueName } = req.body;
      if (!name || !email || !company || !catalogueUrl || !catalogueName) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const request = createRequest({ name, email, company, comment, catalogueUrl, catalogueName });
      // Send confirmation email (non-blocking — don't fail if email fails)
      sendRequestConfirmation(email, name, catalogueName).catch((e) =>
        console.error("[mailer] confirmation email failed:", e.message)
      );
      res.status(201).json({ ok: true, id: request.id });
    } catch (error) {
      console.error("catalogue-request error:", error);
      res.status(500).json({ error: "Failed to submit request" });
    }
  });

  // GET /api/admin/catalogue-requests — admin view
  app.get("/api/admin/catalogue-requests", (_req, res) => {
    res.json(getRequests());
  });

  // POST /api/admin/catalogue-requests/:id/approve — admin approves, generates + emails code
  app.post("/api/admin/catalogue-requests/:id/approve", async (req, res) => {
    try {
      const result = approveRequest(req.params.id);
      if (!result) return res.status(404).json({ error: "Request not found" });
      sendDownloadCode(result.request.email, result.request.name, result.code, result.request.catalogueName).catch(
        (e) => console.error("[mailer] code email failed:", e.message)
      );
      res.json({ ok: true, code: result.code });
    } catch (error) {
      console.error("approve error:", error);
      res.status(500).json({ error: "Failed to approve" });
    }
  });

  // POST /api/catalogue-redeem — user redeems code
  app.post("/api/catalogue-redeem", (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Code required" });
    const result = redeemCode(code);
    if (!result) return res.status(404).json({ error: "Invalid or already used code" });
    res.json({ ok: true, catalogueUrl: result.catalogueUrl });
  });

  return httpServer;
}
