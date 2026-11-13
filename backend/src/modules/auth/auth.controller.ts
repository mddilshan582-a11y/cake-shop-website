import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { loginSchema } from './auth.schema';
import { loginAndIssueToken } from './auth.service';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const result = await loginAndIssueToken(data);
  res.status(200).json(result);
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ id: req.currentUser!.id, username: req.currentUser!.username, role: req.currentUser!.role });
});