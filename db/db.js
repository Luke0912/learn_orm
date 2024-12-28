import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js"
configDotenv()


const {
    DB_PORT:port,
    DB_HOST:host,
    DB_DATABASE:database,
    DB_USER:user,
    DB_PASSWORD:password
}=process.env;



const poolConnection = mysql.createPool({
    port:parseInt(port),
    host,
    user,
    password,
    database
});


export const db = drizzle({ client: poolConnection , schema , mode: 'planetscale'});




// or if you need client connection
// async function main() {
//   const connection = await mysql.createConnection({
//     host: "host",
//     user: "user",
//     database: "database",
//   });
//   const db = drizzle({ client: connection });
// }
// main();