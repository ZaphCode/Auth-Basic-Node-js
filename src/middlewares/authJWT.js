import jwt from 'jsonwebtoken';
import gConfig from '../utils/config';
import { handleErr } from '../utils/functions';

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
