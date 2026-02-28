import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema } from "@shared/schema";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Uploads dir sits at project root (/../uploads relative to dist/server.js)
const UPLOADS_DIR = path.resolve(__dirname, "..", "uploads");


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

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

  return httpServer;
}
