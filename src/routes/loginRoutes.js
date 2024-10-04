import { Router } from 'express';
import loginController from '../controllers/loginController';

const router = new Router();

router.get('/', loginController.index);
router.post('/register', loginController.register);
router.post('/logon', loginController.logon);
router.get('/logout',loginController.logout);

export default router;