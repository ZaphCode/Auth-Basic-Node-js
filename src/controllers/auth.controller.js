import User from '../models/User';
import { encrypt, handleErr, handleP, comparePass } from '../utils/functions';
import jwt from 'jsonwebtoken';
import gConfig from '../utils/config';

export const register = async (req, res) => {
	const { username, email } = req.body;

	const newUser = new User({
		username: username,
		email: email,
		password: await encrypt(req.body.password),
		role: 'user'
	});

	const [user, err] = await handleP(newUser.save());

	if (!user || err)
		return res.status(500).json(handleErr(err, 'saved user error'));

	const { password, ...userData } = await user.toJSON();

	return res.status(201).json({ status: 'success', user: userData });
};

export const login = async (req, res) => {
	const { email } = req.body;

	const [userFound, err] = await handleP(User.findOne({ email: email }));

	if (!userFound || err)
		return res.status(404).json(handleErr(err, 'User not found'));

	console.log(userFound);

	const passMatch = await comparePass(req.body.password, userFound.password);

	if (!passMatch)
		return res.status(404).json(handleErr(err, 'Invalid Password'));

	const token = jwt.sign({ _id: userFound._id }, gConfig.jwt.secret);

	const { password, ...userData } = await userFound.toJSON();

	//? SEND THE HTTPONLYCOOKIE
	res.cookie('jwt', token, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});

	return res.status(201).json({ status: 'success', user: userData});
};

export const authUser = async (req, res) => {
	const userId = req.userId;

	const [userFound, err] = await handleP(
		User.findById(userId, { password: 0 })
	);

	if (!userFound || err)
		return res.status(404).json(handleErr(err, 'User not found'));

	return res.status(201).json({ status: 'success', user: userFound });
};

export const logout = async (req, res) => {
	// const token = req.cookies['jwt'];
	// if (!token) return res.status(400).json(handleErr(null, 'No token found'));

	res.cookie('jwt', '', { maxAge: 0 });

	return res.status(200).json({ status: 'success', msg: 'cookie deleted' });
};

