import fs from 'fs';
import path from 'path';
import http from 'http';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

export default class App {
    constructor() {
        App.BASE_DIR = path.dirname(__dirname);
        this.config = JSON.parse(
            fs.readFileSync(path.join(App.BASE_DIR, 'resources', `${process.argv[2]}.json`), 'utf-8')
        );
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
        this.server.listen(this.config.port, '::', () => {
            console.log(`Server running at http://0.0.0.0:${this.config.port}`);
        });
    }

    static getInstance() {
        if (!App.INSTANCE) {
            App.INSTANCE = new App();
        }
        return App.INSTANCE;
    }
}
