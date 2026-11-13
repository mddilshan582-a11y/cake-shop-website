export type UserRole = 'STAFF';

export interface User {
  id: number;
  username: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}