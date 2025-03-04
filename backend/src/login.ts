import { Context } from 'hono';

export async function login(context: Context) {
  try {
    const { email, password } = await context.req.json();

    const expectedEmail = process.env.AUTH_EMAIL;
    const expectedPassword = process.env.AUTH_PASSWORD;

    if (!expectedEmail || !expectedPassword) {
      console.error('Missing authentication environment variables.');
      return context.json({ error: 'Internal Server Error' }, 500);
    }

    if (email === expectedEmail && password === expectedPassword) {
      const token = btoa(`${email}:${password}`);
      return context.json({ message: 'Login successful', token, email }, 200);
    } else {
      return context.json({ error: 'Invalid credentials' }, 401);
    }
  } catch (error) {
    console.error('Error during login:', error);
    return context.json({ error: 'Internal Server Error' }, 500);
  }
}
