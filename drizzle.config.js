import { configDotenv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
configDotenv();


const {
    DB_PORT:port,
    DB_HOST:host,
    DB_DATABASE:database,
    DB_USER:user,
    DB_PASSWORD:password
}=process.env

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.js',
  dialect: 'mysql',
  dbCredentials: {
    port:parseInt(port),
    host,
    user,
    password,
    database
  },
});
