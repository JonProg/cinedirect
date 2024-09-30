import { Router } from 'express';
import movieController from '../controllers/movieController';

const router = new Router();

router.get('/:id', movieController.index);
router.get('/genre/:genre_id', movieController.genre);

export default router;