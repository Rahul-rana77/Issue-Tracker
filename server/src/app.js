import express from 'express';
import authRoutes from './routes/auth.route.js';
import issueRoutes from './routes/issue.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://urbanfix-nine.vercel.app',
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/issue', issueRoutes);
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;