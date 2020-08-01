import fs from 'fs';
import path from 'path';
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

export default class App {
    constructor() {
        this.BASE_DIR = path.dirname(__dirname);
        this.ENV = process.env.ENV || 'development';
        this.config = JSON.parse(fs.readFileSync(path.join(this.BASE_DIR, 'resources', `${this.ENV}.json`), 'utf-8'));
        this.connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        };
        this.app = express();
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(morgan('combined'));

        routes.forEach((router, prefix) => {
            this.app.use(prefix, router);
        });

        this.serverOptions = {};
        this.server = http.createServer(this.serverOptions, this.app);
    }

    async run() {
        try {
            await mongoose.connect(this.config.mongoUri, this.connectionOptions);
            this.server.listen(this.config.port, '::', () => {
                console.log(`Environment: ${this.ENV}`);
                console.log(`Server running at http://0.0.0.0:${this.config.port}`);
            });
        } catch (err) {
            throw err;
        }
    }

    static getInstance() {
        if (!App.INSTANCE) {
            App.INSTANCE = new App();
        }
        return App.INSTANCE;
    }
}
