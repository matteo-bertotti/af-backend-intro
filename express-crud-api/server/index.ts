import express from 'express';
import { pool } from './db';
import routes from './routes';

const app = express();
app.use(express.json());

// Initialize routes
routes(app);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});