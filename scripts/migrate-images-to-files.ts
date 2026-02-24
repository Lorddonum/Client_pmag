/**
 * Migration script: converts base64 images in the DB to /uploads/ files.
 * Run once on the VPS: npx tsx scripts/migrate-images-to-files.ts
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { products } from "../shared/schema";
import { eq } from "drizzle-orm";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.resolve(__dirname, "..", "uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

function isBase64Image(value: string | null | undefined): boolean {
    return typeof value === "string" && value.startsWith("data:image/");
}

async function convertBase64ToFile(base64: string, maxWidth = 1200): Promise<string> {
    const matches = base64.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) throw new Error("Invalid base64 image");

    const buffer = Buffer.from(matches[2], "base64");
    const webpBuffer = await sharp(buffer)
        .resize(maxWidth, null, { withoutEnlargement: true })
        .webp({ quality: 75, effort: 4 })
        .toBuffer();

    const filename = `${randomUUID()}.webp`;
    fs.writeFileSync(path.join(UPLOADS_DIR, filename), webpBuffer);
    return `/uploads/${filename}`;
}

async function migrate() {
    const allProducts = await db.select().from(products);
    console.log(`Found ${allProducts.length} products to process...`);

    let converted = 0;
    let skipped = 0;
    let errors = 0;

    for (const product of allProducts) {
        try {
            const updates: Record<string, unknown> = {};

            // Main thumbnail image
            if (isBase64Image(product.image)) {
                process.stdout.write(`  [${product.id}] image... `);
                updates.image = await convertBase64ToFile(product.image!, 800);
                console.log(`✓ ${updates.image}`);
                converted++;
            }

            // Gallery images array
            if (Array.isArray(product.images) && product.images.length > 0) {
                const newImages: string[] = [];
                for (const img of product.images) {
                    if (isBase64Image(img)) {
                        process.stdout.write(`  [${product.id}] gallery img... `);
                        const url = await convertBase64ToFile(img, 1200);
                        newImages.push(url);
                        console.log(`✓ ${url}`);
                        converted++;
                    } else {
                        newImages.push(img); // already a URL
                    }
                }
                if (newImages.some((img, i) => img !== product.images![i])) {
                    updates.images = newImages;
                }
            }

            // Technical drawings array
            if (Array.isArray(product.technicalDrawings) && product.technicalDrawings.length > 0) {
                const newDrawings: string[] = [];
                for (const img of product.technicalDrawings) {
                    if (isBase64Image(img)) {
                        process.stdout.write(`  [${product.id}] drawing... `);
                        const url = await convertBase64ToFile(img, 1200);
                        newDrawings.push(url);
                        console.log(`✓ ${url}`);
                        converted++;
                    } else {
                        newDrawings.push(img);
                    }
                }
                if (newDrawings.some((img, i) => img !== product.technicalDrawings![i])) {
                    updates.technicalDrawings = newDrawings;
                }
            }

            // Packaging method image
            if (isBase64Image(product.packagingMethodImage)) {
                process.stdout.write(`  [${product.id}] packaging img... `);
                updates.packagingMethodImage = await convertBase64ToFile(product.packagingMethodImage!, 800);
                console.log(`✓ ${updates.packagingMethodImage}`);
                converted++;
            }

            // Apply updates to DB
            if (Object.keys(updates).length > 0) {
                await db.update(products).set(updates).where(eq(products.id, product.id));
            } else {
                skipped++;
            }
        } catch (err) {
            console.error(`  [${product.id}] ERROR:`, err);
            errors++;
        }
    }

    await pool.end();
    console.log(`\nDone! Converted: ${converted}, Skipped: ${skipped}, Errors: ${errors}`);
}

migrate().catch(console.error);
