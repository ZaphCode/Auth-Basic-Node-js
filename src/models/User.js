import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'user',
			required: true,
		},
	},
	//* Options
	{
		timestamps: true,
		versionKey: false,
	}
);


export default model('User', userSchema);
