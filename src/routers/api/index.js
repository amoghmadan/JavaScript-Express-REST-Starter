import {Router} from 'express';

import accountsRouter from './accounts.router';

const urlPatterns = new Map([['/accounts', accountsRouter]]);

// eslint-disable-next-line new-cap
const apiRouter = Router();
urlPatterns.forEach((router, path) => {
  apiRouter.use(path, router);
});

export default apiRouter;
