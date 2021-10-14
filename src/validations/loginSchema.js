import * as yup from 'yup';

const loginSchema = yup.object({
	email: yup.string().trim().strict().email().required(),
	password: yup.string().required(),
});

export default loginSchema;