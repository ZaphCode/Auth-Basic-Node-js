import { Router } from 'express';
import validation from '../middlewares/validation'
import registerSchema from '../validations/registerSchema'
import loginSchema from '../validations/loginSchema'
import * as authCtrl from '../controllers/auth.controller';
import { verifyToken, verifyRole} from "../middlewares/authJWT";
import checkDuplicate from '../middlewares/checkDuplicate'

const router = Router();

router.post('/register', validation(registerSchema), checkDuplicate, authCtrl.register)

router.post('/login', validation(loginSchema), authCtrl.login)

router.get('/user', verifyToken, authCtrl.authUser)

router.post('/logout', verifyToken, authCtrl.logout)


export default router;
