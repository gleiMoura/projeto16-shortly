import pg from "pg";
import dotenv, { config } from "dotenv";
dotenv.config();

const { Pool } = pg;

const configuration = {
    connectionString: process.env.DTABASE_URL
}

//The config.sll is conected with the security of application and deploy in heroku
if(process.env.MODE === "PORD"){
    config.ssl = {
        rejectUnauthorized: false
    }
}

const db = new Pool(configuration);

export default db;