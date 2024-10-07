import { Router } from 'express';
import homeController from '../controllers/homeController';

const router = new Router();

router.get('/', (req, res) => {
    res.json('Lista de filmes');
  })


export default router;