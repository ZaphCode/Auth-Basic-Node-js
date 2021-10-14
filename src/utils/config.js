const gConfig = {
	jwt: {
		secret: process.env.JWT_SECRET || 'Zaph1312',
	},
	DB: {
		URL: process.env.DB_URL || 'mongodb://Localhost/zaph_auth_api',
		USER: process.env.DB_USER,
		PASSWORD: process.env.DB_PASSWORD,
	},
};

export default gConfig;
