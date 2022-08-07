import { Role } from '@/constants/role';

export * from './forms';

export type SortingDirection = 'ASC' | 'DESC';

export type ApiError = {
  statusCode: number;
  message: string;
  error: string;
};

export type CommonEntityProps = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type Organization = CommonEntityProps & {
  title: string;
  description: string;
  properties: Record<string, unknown> | null;
  stands: string[];
};

export type Application = CommonEntityProps & {
  title: string;
  description: string | null;
  properties: Record<string, unknown> | null;
  stands: string[];
  applicationCategoryId: string;
};

export type ApplicationCategory = CommonEntityProps & {
  title: string;
  description: string | null;
  properties: Record<string, unknown> | null;
  applications: string[];
};

export type StandCategory = CommonEntityProps & {
  title: string;
  description: string | null;
  properties: Record<string, unknown> | null;
  stands: string[];
};

export type Stand = CommonEntityProps & {
  title: string;
  description: string | null;
  properties: Record<string, unknown> | null;
  standCategoryId: string;
  applicationId: string;
  organizationId: string | null;
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

export type GetApplicationsResponse = {
  items: Application[];
  count: number;
};

export type GetApplicationCategoriesResponse = {
  items: ApplicationCategory[];
  count: number;
};

export type GetStandsResponse = {
  items: Stand[];
  count: number;
};

export type GetStandCategoriesResponse = {
  items: StandCategory[];
  count: number;
};

export type GetOrganizationsResponse = {
  items: Organization[];
  count: number;
};
