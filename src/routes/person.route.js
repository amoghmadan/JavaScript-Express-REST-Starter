import { Router } from 'express';
import { personController } from '../controllers/person.controller';

const router = Router();

router.route('/')
    .get(personController.fetchAll)
    .post(personController.createOne);
router.route('/:id')
    .get(personController.fetchOne)
    .put(personController.fetchOneAndUpdate)
    .delete(personController.fetchOneAndDelete);

export default router;
