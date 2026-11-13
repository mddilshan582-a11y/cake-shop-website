import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth';
import { uploadImage } from '../../middleware/upload';
import {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  setCategoryStatus,
} from './category.controller';

const router = Router();

// All management routes require an authenticated STAFF user.
router.use(authenticateToken);

router.get('/', listCategories);
router.get('/:id', getCategory);
router.post('/', uploadImage.single('image'), createCategory);
router.put('/:id', uploadImage.single('image'), updateCategory);
router.patch('/:id/status', setCategoryStatus);

export default router;