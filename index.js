import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import eventRoutes from './routes/eventRoutes.js';
import { notFound, errorHandler } from './utils/errorHandler.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/events', eventRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
