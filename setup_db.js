import pg from 'pg';
const { Client } = pg;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'pass321',
    port: 5432,
});

async function createDb() {
    try {
        await client.connect();
        // Check if database exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'paralight'");
        if (res.rowCount === 0) {
            console.log("Creating database paralight...");
            await client.query('CREATE DATABASE paralight');
            console.log("Database created successfully.");
        } else {
            console.log("Database paralight already exists.");
        }
    } catch (err) {
        console.error("Error creating database:", err);
    } finally {
        await client.end();
    }
}

createDb();
