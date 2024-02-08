import {Router} from 'express';

import {accountsController} from '@/controllers';
import {authenticate} from '@/middlewares';

// eslint-disable-next-line new-cap
const accountsRouter = Router();
accountsRouter.route('/login').post(accountsController.login);
accountsRouter.route('/detail').get(authenticate, accountsController.detail);
accountsRouter.route('/logout').delete(authenticate, accountsController.logout);

export default accountsRouter;
