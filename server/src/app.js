import express from 'express';
import authRoutes from './routes/auth.route.js';
import issueRoutes from './routes/issue.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://urban-fix-smoky.vercel.app',
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/issue', issueRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;