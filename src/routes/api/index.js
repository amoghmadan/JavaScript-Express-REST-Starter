import {Router} from 'express';

import accountsRouter from '@/routes/api/accounts.route';

const routes = new Map([['/accounts', accountsRouter]]);

// eslint-disable-next-line new-cap
const apiRouter = Router();
routes.forEach((router, path) => {
  apiRouter.use(path, router);
});

export default apiRouter;
