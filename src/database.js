import mongoose from 'mongoose';
import gConfig from './utils/config';

mongoose
	.connect(gConfig.DB.URL)
	.then((db) => console.log('Database is connected'))
	.catch((error) => console.log(error));

