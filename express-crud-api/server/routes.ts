import { Request, Response, Express } from 'express';
import { pool } from './db';

export default (app: Express) => {
  // Create table if it doesn't exist
  pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      task TEXT NOT NULL,
      completed BOOLEAN DEFAULT false
    )
  `);

  // CRUD Endpoints

  // Get all todos
  app.get('/todos', async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  });

  // Create a new todo
  app.post('/todos', async (req: Request, res: Response) => {
    const { task } = req.body;
    const result = await pool.query(
      'INSERT INTO todos (task) VALUES ($1) RETURNING *',
      [task]
    );
    res.status(201).json(result.rows[0]);
  });

  // Update a todo by ID
  app.put('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    const result = await pool.query(
      'UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *',
      [task, completed, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).send('Todo not found');
    }

    res.json(result.rows[0]);
  });

  // Delete a todo by ID
  app.delete('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).send('Todo not found');
    }

    res.status(204).send();
  });
};