import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  DATABASE_URL: z.string().trim().min(1),
 JWT_SECRET: z.string().trim().min(16),
 JWT_EXPIRES_IN: z.string().trim().min(1).default('1d'),
 PORT: z.coerce.number().int().positive().default(5000),
 CORS_ORIGIN: z.string().trim().default('http://localhost:5173'),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;