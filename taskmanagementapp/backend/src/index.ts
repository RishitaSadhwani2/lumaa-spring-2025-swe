import express from 'express';
import dotenv from 'dotenv';
import pool from './db';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// A sample route to test the database connection
app.get('/', async (req, res) => {
  try {
    // This query returns the current time from the MySQL server.
    const [rows] = await pool.query('SELECT NOW() as now');
    res.json({ message: 'Hello from backend!', time: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});
app.use(cors());
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
