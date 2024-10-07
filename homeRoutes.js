import { Router } from 'express';
//import homeController from './src/controllers/homeController';

const router = new Router();

router.get('/', function(req,res){
    res.json("seu merda 4")
});
router.get('/search', homeController.search);

export default router;