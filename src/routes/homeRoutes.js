import { Router } from 'express';


const router = new Router();

router.get('/', (req, res) => {
    res.json('Lista de filmes');
  })


export default router;