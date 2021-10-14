import * as yup from 'yup';

const registerSchema = yup.object({
	username: yup
		.string()
		.matches(/^[a-zA-Z0-9-_]+$/, 'Only Aphanumeric values')
		.min(5)
		.max(20)
		.trim()
		.strict()
		.required(),
	email: yup.string().trim().strict().email().required(),
	password: yup.string().min(8).max(40).required(),
	role: yup.string().matches(/(user|moderator|admin)/, 'Invalid Role').required()
});

export default registerSchema;