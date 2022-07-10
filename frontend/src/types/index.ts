export * from './forms';

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
  fullName: string;
  description: string;
  role: string;
  properties: Record<string, unknown>;
};
