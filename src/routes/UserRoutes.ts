import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();
const userController = new UserController();

router.get('/', userController.getUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;
