import jwt from 'jsonwebtoken';
import User from '../models/User';
import gConfig from '../utils/config';
import { handleErr, handleP } from '../utils/functions';

export const verifyToken = async (req, res, next) => {
	const token = req.cookies['jwt'];

	if (!token) return res.status(400).json(handleErr(null, 'No token found'));

	try {
		const decoded = jwt.verify(token, gConfig.jwt.secret);
		console.log('decoded: ', decoded._id);
		req.userId = decoded._id;
		return next();
	} catch (error) {
		return res.status(400).json(handleErr(error, 'Invalid token'));
	}
};

export const verifyRole = (role) => async (req, res, next) => {
	const userId = req.userId;

	const [user, err] = await handleP(User.findById(userId));

	if (!user || err)
		return res.status(400).json(handleErr(err, 'Error Searching the user'));

	if (user.role !== role && user.role !== 'admin')
		return res.status(400).json(handleErr(null, "You don't have permissions"));

	return next();
};
