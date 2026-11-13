import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { prisma } from '../../config/prisma';
import { ApiError } from '../../middleware/errorHandler';
import { LoginInput } from './auth.schema';


export interface AuthResult {
  token: string;

  user: { id: number; username: string; role: 'STAFF' };
}

export async function loginAndIssueToken(credentials: LoginInput): Promise<AuthResult> {
  const user = await prisma.user.findUnique({
    where: { username: credentials.username },
  });

  //  Generic failure - do NOT reveal which credential was wrong
  if (!user || !user.isActive) {
    throw new ApiError(401, 'Invalid username or password');
  }

  const passwordMatches = await bcrypt.compare(credentials.password, user.passwordHash);
  if (!passwordMatches) {
    throw new ApiError(401, 'Invalid username or password');
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] },
  );

  return {
    token,
    user: { id: user.id, username: user.username, role: user.role },
  };
}
