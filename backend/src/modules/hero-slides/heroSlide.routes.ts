import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth';
import { uploadImage } from '../../middleware/upload';
import {
  listHeroSlides,
  getHeroSlide,
  createHeroSlide,
  updateHeroSlide,
  setHeroSlideStatus,
  deleteHeroSlide,
} from './heroSlide.controller';

const router = Router();

router.use(authenticateToken);

router.get('/', listHeroSlides);
router.get('/:id', getHeroSlide);
router.post('/', uploadImage.single('image'), createHeroSlide);
router.put('/:id', uploadImage.single('image'), updateHeroSlide);
router.patch('/:id/status', setHeroSlideStatus);
router.delete('/:id', deleteHeroSlide);

export default router;