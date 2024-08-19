import { Router } from 'express';
import movieController from '../controllers/movieController';

const router = new Router();

router.get('/:id', movieController.index);

export default router;