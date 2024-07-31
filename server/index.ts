import app from './app';

const server = Bun.serve({
  fetch: app.fetch,
});

console.log('Server is running on ', server.url.href);
