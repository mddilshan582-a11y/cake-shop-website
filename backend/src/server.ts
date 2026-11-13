import { createApp } from './app';
import { env } from './config/env';
import { prisma } from './config/prisma';

async function main(): Promise<void> {
  await prisma.$connect();
  const app = createApp();
  app.listen(env.PORT, () => {
    console.log('Smart Cake Shop backend listening on http://localhost:' + env.PORT);
  });
}

main().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', error);
  process.exit(1);
});