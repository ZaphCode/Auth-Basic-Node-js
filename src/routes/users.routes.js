import { Router } from 'express';
import validation from '../middlewares/validation';
import userSchema from '../validations/userSchema';
import * as userCtrl from '../controllers/users.controller';
import { verifyToken, verifyRole } from '../middlewares/authJWT';
import checkDuplicate from '../middlewares/checkDuplicate';

const router = Router();

router.get('/', verifyToken, verifyRole('moderator'), userCtrl.getUsers);

router.get('/:search', verifyToken, verifyRole('moderator'), userCtrl.searchUsers);

router.post(
	'/',
	verifyToken,
	verifyRole('admin'),
	validation(userSchema),
	checkDuplicate,
	userCtrl.createUser
);

router.put(
	'/:userId',
	verifyToken,
	verifyRole('admin'),
	validation(userSchema),
	checkDuplicate,
	userCtrl.updateUser
);

router.delete(
	'/:userId',
	verifyToken,
	verifyRole('admin'),
	userCtrl.deleteUser
);

export default router;
