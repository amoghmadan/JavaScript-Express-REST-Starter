import {Server} from 'http';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import db from '@/models';
import routes from '@/routes';

/**
 * Get request listener
 * @return {express.Application}
 */
export function getRequestListener() {
  const application = express();
  application.use(helmet());
  application.use(express.urlencoded({extended: true}));
  application.use(express.json());
  application.use(morgan('combined'));

  routes.forEach((router, path) => {
    application.use(path, router);
  });

  return application;
}

/**
 * Bootstrap application
 * @param {number} port
 * @param {string} host
 */
export default async function bootstrap(port, host) {
  const options = {};
  const requestListener = getRequestListener();
  const server = new Server(options, requestListener);

  await db.sequelize.sync({force: false, logging: false});
  server.listen(port, host, () => {
    console.info(server.address());
  });
}
