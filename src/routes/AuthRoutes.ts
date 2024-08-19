import { Router } from 'express';
import { AuthController } from '../controllers';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.registerUser.bind(authController));
router.post('/login', authController.loginUser.bind(authController));

export default router;
