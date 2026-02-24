/**
 * Converts all jpg/jpeg/png images in client/src/assets/ and client/public/
 * to WebP format, deletes the originals, and updates all source file references.
 *
 * Run with: npx tsx scripts/convert-to-webp.ts
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMAGE_DIRS = [
    path.join(ROOT, "client", "src", "assets"),
    path.join(ROOT, "client", "public"),
];
const SOURCE_DIRS = [
    path.join(ROOT, "client", "src"),
    path.join(ROOT, "server"),
];
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

// Collect all image files recursively
function collectImages(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    const results: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...collectImages(fullPath));
        } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
            results.push(fullPath);
        }
    }
    return results;
}

// Collect all source files recursively
function collectSourceFiles(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    const results: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...collectSourceFiles(fullPath));
        } else if ([".tsx", ".ts", ".css", ".html"].includes(path.extname(entry.name))) {
            results.push(fullPath);
        }
    }
    return results;
}

async function main() {
    console.log("🔍 Finding images...");
    const images = IMAGE_DIRS.flatMap(collectImages);
    console.log(`   Found ${images.length} images to convert\n`);

    let converted = 0;
    let skipped = 0;
    let totalSavedBytes = 0;

    for (const imgPath of images) {
        const ext = path.extname(imgPath);
        const webpPath = imgPath.slice(0, -ext.length) + ".webp";

        // Skip if webp already exists
        if (fs.existsSync(webpPath)) {
            console.log(`⏭  Skipping (already converted): ${path.relative(ROOT, imgPath)}`);
            skipped++;
            continue;
        }

        try {
            const originalSize = fs.statSync(imgPath).size;
            await sharp(imgPath)
                .webp({ quality: 85, effort: 4 })
                .toFile(webpPath);
            const newSize = fs.statSync(webpPath).size;
            const savings = Math.round((1 - newSize / originalSize) * 100);
            totalSavedBytes += originalSize - newSize;

            fs.unlinkSync(imgPath); // Delete original
            console.log(`✅ ${path.relative(ROOT, imgPath)} → .webp  [saved ${savings}%]`);
            converted++;
        } catch (err) {
            console.error(`❌ Failed: ${path.relative(ROOT, imgPath)}`, err);
        }
    }

    console.log(`\n📝 Updating source file references...`);
    const sourceFiles = SOURCE_DIRS.flatMap(collectSourceFiles);
    let filesUpdated = 0;

    for (const srcFile of sourceFiles) {
        let content = fs.readFileSync(srcFile, "utf-8");
        let updated = content;

        // Replace all image extension references (.jpg, .jpeg, .png) with .webp
        // Matches extensions followed by quote, backtick, or closing paren
        updated = updated.replace(/\.(jpg|jpeg|png)(?=[`"')])/gi, ".webp");

        if (updated !== content) {
            fs.writeFileSync(srcFile, updated, "utf-8");
            console.log(`   Updated: ${path.relative(ROOT, srcFile)}`);
            filesUpdated++;
        }
    }

    const savedKB = Math.round(totalSavedBytes / 1024);
    console.log(`
✨ Done!
   Converted: ${converted} images
   Skipped:   ${skipped} (already .webp)
   Saved:     ~${savedKB} KB
   Source files updated: ${filesUpdated}
  `);
}

main().catch(console.error);
