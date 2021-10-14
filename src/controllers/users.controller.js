import User from '../models/User';
import { encrypt, handleErr, handleP } from '../utils/functions';

export const getUsers = async (req, res) => {
	const [users, err] = await handleP(User.find({}, { password: 0 }));

	if (!users || err)
		return res.status(404).json(handleErr(err, 'Find users error'));

	return res
		.status(200)
		.json({ status: 'success', count: users.length, users: users });
};

export const searchUsers = async (req, res) => {
	const { search } = req.params;

	const [users, err] = await handleP(
		User.find({
			$or: [
				{ username: { $regex: search, $options: 'i' } },
				{ email: { $regex: search, $options: 'i' } },
			],
		}, {password: 0})
	);

	if (!users || err)
		return res.status(404).json(handleErr(err, 'Find users error'));

	if (users.length <= 0)
		return res
			.status(200)
			.json({ status: 'success', msg: 'No users found'});

	return res
		.status(200)
		.json({ status: 'success', count: users.length, users: users });
};

export const createUser = async (req, res) => {
	const { username, email, role } = req.body;

	const newUser = new User({
		username: username,
		email: email,
		password: await encrypt(req.body.password),
		role: role,
	});

	const [user, err] = await handleP(newUser.save());

	if (!user || err)
		return res.status(500).json(handleErr(err, 'saved user error'));

	const { password, ...userData } = await user.toJSON();

	return res.status(201).json({ status: 'success', user: userData });
};

export const updateUser = async (req, res) => {
	const { userId } = req.params;

	const [user, err] = await handleP(
		User.findByIdAndUpdate(userId, req.body, { new: true })
	);

	if (!user || err)
		return res.status(500).json(handleErr(err, 'Update user error'));

	const { password, ...userData } = await user.toJSON();

	return res.status(201).json({ status: 'success', user: userData });
};

export const deleteUser = async (req, res) => {
	const { userId } = req.params;

	const [user, err] = await handleP(User.findByIdAndDelete(userId));

	if (!user || err)
		return res.status(500).json(handleErr(err, 'Delete user error'));

	const { password, ...userData } = await user.toJSON();

	return res.status(201).json({ status: 'success', deleted_user: userId });
};
