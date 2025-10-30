import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import transactionsRoutes from './routes/transactionsRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/login', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));