import { Router } from 'express';
import { helloWorld } from '../controllers/root.controller';

const router = Router();

router.get('/', helloWorld);

export default router;
