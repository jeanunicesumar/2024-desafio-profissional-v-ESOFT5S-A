import { randomUUID } from "crypto";
import dotenv from 'dotenv';

dotenv.config();

const randomName = randomUUID().slice(0, 4);

const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'teste';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME;
const dbRandomName = `${randomName}-test`;

const config = {
    dbName,
    dbRandomName,
    dbUrl: `mongodb://${dbHost}:${dbPort}`
}

export default config;