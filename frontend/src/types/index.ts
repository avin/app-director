import { Role } from '@/constants/role';

export * from './forms';

export type ApiError = {
  statusCode: number;
  message: string;
  error: string;
};

export type Organization = {
  id: string;
};

export type Application = {
  id: string;
};

export type Stand = {
  id: string;
};

export type User = {
  id: string;
  email: string;
  fullName: string | null;
  description: string | null;
  role: Role;
  properties: Record<string, unknown>;
};

export type LogInResponse = {
  accessToken: string;
  user: User;
};
