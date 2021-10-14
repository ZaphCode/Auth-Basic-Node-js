import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes'
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
app.use('/api/users', usersRoutes);

export default app;
