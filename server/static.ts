import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
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

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
