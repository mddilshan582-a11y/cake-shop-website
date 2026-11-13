import path from 'path';
import cors from 'cors';
import express, { Express } from 'express';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import authRoutes from './modules/auth/auth.routes';
import healthRoutes from './modules/health/health.routes';
import categoryRoutes from './modules/categories/category.routes';
import cakeRoutes from './modules/cakes/cake.routes';
import heroSlideRoutes from './modules/hero-slides/heroSlide.routes';
import shopRoutes from './modules/shop/shop.routes';

export function createApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const uploadsDir = path.join(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadsDir));

  app.use('/api/health', healthRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/cakes', cakeRoutes);
  app.use('/api/hero-slides', heroSlideRoutes);
  app.use('/api/shop', shopRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}