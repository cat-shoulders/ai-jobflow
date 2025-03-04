import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { analyze } from './api/analyze';
import { auth } from './api/auth';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173', // replace with your origin
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
);

app.get('/', (c) => {
  return c.json({ message: 'Hello Bun!' });
});

app.use('*', async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  console.log('session', session);
  if (!session) {
    c.set('user', null);
    c.set('session', null);
    return next();
  }

  c.set('user', session.user);
  c.set('session', session.session);
  return next();
});

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

app.all('/api/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

app.all('/api/analyze', analyze);

const port = parseInt(process.env.PORT!) || 3000;
console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
