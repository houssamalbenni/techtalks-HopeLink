import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import connectDB from './src/config/db.js';
import apiRoutes from './src/routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MERN server base is running' });
});

app.use('/api', apiRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
