import bcrypt from 'bcrypt';

export const handleP = async (Prom) => {
	try {
		const data = await Prom;
		return [data, null];
	} catch (error) {
		return [null, error];
	}
};

export const handleErr = (err, errorMessage) => {
	if (err) {
		return {
			status: 'fail',
			msg: err.message || errorMessage,
		};
	}
	return {
		status: 'fail',
		msg: errorMessage,
	};
};

export const encrypt = async (data) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(data, salt);
};

export const comparePass = async (receivedPassword, password) => {
	return await bcrypt.compare(receivedPassword, password);
};
