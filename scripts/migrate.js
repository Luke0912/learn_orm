import { configDotenv } from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import * as schema from '../db/schema.js';
import path from 'path';

configDotenv();

const {
    DB_PORT: port,
    DB_HOST: host,
    DB_DATABASE: database,
    DB_USER: user,
    DB_PASSWORD: password,
} = process.env;

const main = async () => {
    try {
        // Use mysql2's createPool for database connections
        const migrationsClient = mysql.createPool({
            host,
            port: parseInt(port, 10),
            user,
            password,
            database,
            waitForConnections: true,
            connectionLimit: 1, // Limit connections for migrations
            queueLimit: 0,
        });

        const db = drizzle({ client: migrationsClient , schema , mode: 'planetscale'});

        console.log('Starting migrations...');
        await migrate(db, { migrationsFolder: path.resolve('drizzle/') });
        console.log('Migrations completed successfully.');

        // Close the connection pool
        await migrationsClient.end();
    } catch (error) {
        console.error('Error during migration:', error.message);
        process.exit(1);
    }
};

main();
