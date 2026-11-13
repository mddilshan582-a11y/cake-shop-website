import { Router } from 'express';
import {
  listCategories,
  listCakes,
  listFeatured,
  listCounter,
  cakesByCategory,
  getCake,
  listHeroSlides,
} from './shop.controller';

const router = Router();

// NOTE: public routes - deliberately NO authenticateToken middleware.
router.get('/hero-slides', listHeroSlides);
router.get('/categories', listCategories);
router.get('/cakes', listCakes);
router.get('/cakes/featured', listFeatured);
router.get('/cakes/counter', listCounter);
router.get('/categories/:id/cakes', cakesByCategory);
router.get('/cakes/:id', getCake);

export default router;