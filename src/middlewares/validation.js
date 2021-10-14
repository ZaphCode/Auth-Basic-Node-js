const validation = (schema) => async (req, res, next) => {
	try {
		await schema.validate(req.body);
        return next()
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			msg: error.message,
		});
	}
};

export default validation;
