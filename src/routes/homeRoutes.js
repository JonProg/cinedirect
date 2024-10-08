import { Router } from 'express';
import homeController from './src/controllers/homeController';

const router = new Router();

router.get('/', homeController.index);
router.get('/search', homeController.search);

export default router;