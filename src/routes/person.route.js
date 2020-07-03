import { Router } from 'express';
import {
    fetchAll,
    fetchOne,
    createOne,
    fetchOneAndUpdate,
    fetchOneAndDelete
} from '../controllers/person.controller';

const router = Router();

router.get('/', fetchAll);
router.get('/:id', fetchOne);
router.post('/', createOne);
router.put('/:id', fetchOneAndUpdate);
router.delete('/:id', fetchOneAndDelete);

export default router;
