import { pool } from "../server/db.js";

async function main() {
  const client = await pool.connect();
  try {
    const r1 = await client.query(
      `UPDATE products
       SET series = array_replace(series, '6mm Magnetic Track Series', 'Flexible 6mm Magnetic Track Series')
       WHERE '6mm Magnetic Track Series' = ANY(series)`
    );
    const r2 = await client.query(
      `UPDATE products
       SET sub_series = array_replace(sub_series, '6mm Magnetic Tracks', 'Flexible 6mm Magnetic Tracks')
       WHERE sub_series IS NOT NULL`
    );
    const r3 = await client.query(
      `UPDATE products
       SET sub_series = array_replace(sub_series, '6mm Magnetic Light Fixtures', 'Flexible 6mm Magnetic Light Fixtures')
       WHERE sub_series IS NOT NULL`
    );
    const r4 = await client.query(
      `UPDATE products
       SET sub_series = array_replace(sub_series, '6mm Magnetic Accessories', 'Flexible 6mm Magnetic Accessories')
       WHERE sub_series IS NOT NULL`
    );
    console.log("series rows updated:    ", r1.rowCount);
    console.log("sub_series rows updated:", r2.rowCount + r3.rowCount + r4.rowCount);
    console.log("Done!");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
