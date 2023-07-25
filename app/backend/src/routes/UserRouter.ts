import { Router } from 'express';
import UserController from '../controllers/UserController';
import ValidationLogin from '../middlewares/ValidateLogin';
import ValidationToken from '../middlewares/ValidateToken';

const user = new UserController();

const router = Router();

router.post('/', ValidationLogin.validateLogin, (req, res) => user.login(req, res));

router.get('/role', ValidationToken.validateToken, (req, res) => user.getUserRole(req, res));

router.get('/', (req, res) => user.getAllUsers(req, res));

router.get('/:id', (req, res) => user.getUserById(req, res));

export default router;
