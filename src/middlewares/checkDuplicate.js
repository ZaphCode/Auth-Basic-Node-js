import User from '../models/User';

const checkDuplicate = async (req, res, next) => {
	const user = await User.findOne({ username: req.body.username });
	if (user)
		return res
			.status(400)
			.json({ status: 'fail', msg: 'The username already exists' });

	const email = await User.findOne({ email: req.body.email });
	if (email)
		return res
			.status(400)
			.json({ status: 'fail', msg: 'The email already exists' });

	next();
};

export default checkDuplicate;
