import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import { routes } from './routes';
import config from './src/config';

class App {
    express: express.Application;
    private readonly DB_URL = config.dbUrl;
    private readonly DB_NAME = config.dbName;

    constructor() {
        this.express = express();
        this.middleware();
        this.database();
        this.routes();
    }

    private middleware(): void {
        this.express.use(express.json());
    }

    private async database() {
        try {
            mongoose.set("strictQuery", true);
            await mongoose.connect(`${this.DB_URL}/${this.DB_NAME}`);
            console.log("connect database success");
        } catch (error) {
            console.error('Cannot connect to database, error:', error);
        }
    }

    private routes(): void {
        this.express.use(routes);
    }
}

export default new App().express;