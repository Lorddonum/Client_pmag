import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Proper ESM-compatible __dirname (works in both tsx dev and compiled ESM output)
let _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export function serveStatic(app: Express) {
  // In production, dist/server.js and dist/public/ are siblings
  const distPath = path.resolve(_dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static assets with caching headers
  app.use(express.static(distPath, {
    maxAge: '1y', // Cache for 1 year (assets have hashes in filenames)
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      // HTML files should not be cached long
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, must-revalidate');
      }
      // Images in public folder (without hashes) cache for 1 week
      else if (/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      }
      // JS/CSS with hashes can be cached indefinitely
      else if (/\.(js|css)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));

  // Serve user-uploaded images from /uploads/ (persists across deployments)
  const uploadsPath = path.resolve(_dirname, "..", "uploads");
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use("/uploads", express.static(uploadsPath, {
    maxAge: '365d',
    etag: true,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
