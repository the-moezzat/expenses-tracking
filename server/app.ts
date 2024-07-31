import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { expensesRoute } from './routes/expensesRoute';
import { serveStatic } from 'hono/bun';
import { authRoute } from './routes/auth';
const app = new Hono();

app.use('*', logger());
const appRoutes = app.basePath('/api').route('/expenses', expensesRoute).route('/', authRoute);

app.get('*', serveStatic({ root: './frontend/dist' }));
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export default app;
export type ApiRoutes = typeof appRoutes;
