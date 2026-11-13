import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth';
import { uploadImage } from '../../middleware/upload';
import {
  listCakes,
  getCake,
  createCake,
  updateCake,
  setCakeAvailability,
  setCakeFeatured,
  setCakeCounter,
  setCakeStatus,
} from './cake.controller';

const router = Router();

router.use(authenticateToken);

router.get('/', listCakes);
router.get('/:id', getCake);
router.post('/', uploadImage.single('image'), createCake);
router.put('/:id', uploadImage.single('image'), updateCake);
router.patch('/:id/status', setCakeStatus);
router.patch('/:id/availability', setCakeAvailability);
router.patch('/:id/featured', setCakeFeatured);
router.patch('/:id/counter', setCakeCounter);

export default router;