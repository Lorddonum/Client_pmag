import { db } from "../server/db";
import { products } from "../shared/schema";
import fs from "fs";
import path from "path";

async function exportProducts() {
    console.log("📦 Exporting products from database...");

    try {
        // Fetch all products
        const allProducts = await db.select().from(products);

        console.log(`✅ Found ${allProducts.length} products`);

        // Create public/data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), "public", "data");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Export full products data
        const fullPath = path.join(dataDir, "products.json");
        fs.writeFileSync(fullPath, JSON.stringify(allProducts, null, 2));
        console.log(`✅ Exported full products to: ${fullPath}`);

        // Create lightweight grid version (only essential fields)
        const gridProducts = allProducts.map(p => ({
            id: p.id,
            name: p.name,
            modelNumber: p.modelNumber,
            brand: p.brand,
            series: p.series,
            subSeries: p.subSeries,
            image: p.image,
            hotSelling: p.hotSelling
        }));

        const gridPath = path.join(dataDir, "products-grid.json");
        fs.writeFileSync(gridPath, JSON.stringify(gridProducts, null, 2));
        console.log(`✅ Exported grid products to: ${gridPath}`);

        console.log("\n🎉 Export complete!");
        console.log(`   Full data: ${(fs.statSync(fullPath).size / 1024).toFixed(2)} KB`);
        console.log(`   Grid data: ${(fs.statSync(gridPath).size / 1024).toFixed(2)} KB`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Export failed:", error);
        process.exit(1);
    }
}

exportProducts();
