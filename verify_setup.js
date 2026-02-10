
import pg from 'pg';
const { Client } = pg;

console.log("Starting verification...");

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'paralight',
    password: 'pass321',
    port: 5432,
});

async function verify() {
    try {
        console.log("Connecting to database...");
        await client.connect();
        console.log("Connected to database successfully.");
        const res = await client.query('SELECT NOW()');
        console.log("Database time:", res.rows[0]);
        await client.end();
        console.log("Verification complete.");
    } catch (err) {
        console.error("Verification failed:", err);
        process.exit(1);
    }
}

verify();
