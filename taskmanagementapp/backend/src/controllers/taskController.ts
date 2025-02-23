// backend/src/controllers/taskController.ts
import { Request, Response } from 'express';
import pool from '../db';
import { AuthRequest } from '../middleware/authMiddleware';

// Get tasks for authenticated user
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM tasks WHERE userId = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

// Create a new task
export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  try {
    const [result]: any = await pool.query(
      'INSERT INTO tasks (title, description, userId) VALUES (?, ?, ?)',
      [title, description, req.user.id]
    );
    // Fetch the newly created task using the insertId
    const [rows]: any = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating task' });
  }
};

// Update a task
export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    // Check task ownership
    const [rows]: any = await pool.query('SELECT * FROM tasks WHERE id = ? AND userId = ?', [id, req.user.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    // Update the task
    await pool.query('UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?', [title, description, isComplete, id]);
    // Return updated task
    const [updatedRows]: any = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(updatedRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating task' });
  }
};

// Delete a task
export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    // Check if task exists and belongs to user
    const [rows]: any = await pool.query('SELECT * FROM tasks WHERE id = ? AND userId = ?', [id, req.user.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting task' });
  }
};
