const { Pool } = require("pg");

// Load .env manually
const fs = require("fs");
const envPath = require("path").join(__dirname, "../.env");
const envContent = fs.readFileSync(envPath, "utf8");
for (const line of envContent.split("\n")) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

const databaseUrl = process.env.CUSTOM_DATABASE_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString: databaseUrl });

async function run() {
  const client = await pool.connect();
  try {
    const r1 = await client.query(
      "UPDATE products SET series = 'Flexible 6mm Magnetic Track Series' WHERE series = '6mm Magnetic Track Series'"
    );
    const r2 = await client.query(
      "UPDATE products SET sub_series = 'Flexible 6mm Magnetic Tracks' WHERE sub_series = '6mm Magnetic Tracks'"
    );
    const r3 = await client.query(
      "UPDATE products SET sub_series = 'Flexible 6mm Magnetic Light Fixtures' WHERE sub_series = '6mm Magnetic Light Fixtures'"
    );
    const r4 = await client.query(
      "UPDATE products SET sub_series = 'Flexible 6mm Magnetic Accessories' WHERE sub_series = '6mm Magnetic Accessories'"
    );
    console.log("series rows updated:     ", r1.rowCount);
    console.log("sub_series rows updated: ", r2.rowCount + r3.rowCount + r4.rowCount);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);
