import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth';
import { login, me } from './auth.controller';

const router = Router();

router.post('/login', login);
router.get('/me', authenticateToken, me);

export default router;