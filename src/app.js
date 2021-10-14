import express from 'express';
import 'dotenv/config'
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser'

//* express initialization
const app = express();

//* Settings
app.set('PORT', process.env.PORT);

//* Global middlewares
app.use(cookieParser())
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* Routes
app.use('/api/auth', authRoutes);

export default app;
