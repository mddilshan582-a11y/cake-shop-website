import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../config/prisma';

export interface JwtPayload {
  id: number;

 username: string;
  role: 'STAFF';

}

declare global {
  namespace Express {
    interface Request {
      currentUser?: { id: number; username: string; role: 'STAFF' };
    }
  }
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, username: true, role: true, isActive: true },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    req.currentUser = { id: user.id, username: user.username, role: user.role };
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
}