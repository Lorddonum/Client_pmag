import { db as pgDb, pool as pgPool } from "../server/db-postgres-backup";
import { db as mysqlDb } from "../server/db";
import { products as pgProducts } from "../shared/schema-postgres-backup";
import { products as mysqlProducts } from "../shared/schema";

/**
 * Migration script to transfer data from PostgreSQL to MySQL
 * 
 * IMPORTANT: Before running this script:
 * 1. Backup your PostgreSQL database
 * 2. Create MySQL database on Hostinger
 * 3. Update .env with MySQL DATABASE_URL
 * 4. Run `npm run db:push` to create MySQL schema
 * 5. Temporarily rename current db.ts to db-postgres-backup.ts
 * 6. Temporarily rename current schema.ts to schema-postgres-backup.ts
 * 7. Run this script: `npm run migrate-data`
 */

async function migrateData() {
    console.log("📦 Starting data migration from PostgreSQL to MySQL...\n");

    try {
        // Fetch all products from PostgreSQL
        console.log("1️⃣ Fetching products from PostgreSQL...");
        const pgProductsData = await pgDb.select().from(pgProducts);
        console.log(`   ✅ Found ${pgProductsData.length} products\n`);

        if (pgProductsData.length === 0) {
            console.log("⚠️  No products to migrate");
            return;
        }

        // Transform data for MySQL (arrays are now JSON)
        console.log("2️⃣ Transforming data for MySQL...");
        const mysqlProductsData = pgProductsData.map((product) => {
            const { id, ...productWithoutId } = product;

            // Ensure arrays are properly formatted
            return {
                ...productWithoutId,
                series: product.series || [],
                subSeries: product.subSeries || [],
                images: product.images || null,
                technicalDrawings: product.technicalDrawings || null,
            };
        });
        console.log(`   ✅ Transformed ${mysqlProductsData.length} products\n`);

        // Insert into MySQL
        console.log("3️⃣ Inserting products into MySQL...");
        let inserted = 0;
        for (const product of mysqlProductsData) {
            try {
                await mysqlDb.insert(mysqlProducts).values(product);
                inserted++;
                if (inserted % 10 === 0) {
                    console.log(`   📝 Inserted ${inserted}/${mysqlProductsData.length} products...`);
                }
            } catch (error) {
                console.error(`   ❌ Failed to insert product: ${product.name}`, error);
            }
        }
        console.log(`   ✅ Successfully inserted ${inserted} products\n`);

        console.log("✅ Migration completed successfully!");
        console.log("\n📋 Next steps:");
        console.log("   1. Verify data in MySQL database");
        console.log("   2. Test the application: npm run dev");
        console.log("   3. Remove backup files if everything works");

    } catch (error) {
        console.error("❌ Migration failed:", error);
        throw error;
    } finally {
        // Close PostgreSQL connection
        await pgPool.end();
        process.exit(0);
    }
}

migrateData();
