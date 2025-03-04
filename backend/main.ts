import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { analyze } from './analyze';
import { login } from './login';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Hello Bun!' });
});

// Allow cors
app.use(
  '/api/*',
  cors({
    origin: ['http://localhost:5173'],
  }),
);

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

app.all('/api/login', login);
app.all('/api/analyze', analyze);

const port = parseInt(process.env.PORT!) || 3000;
console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
