import { Role } from '@/constants/role';

export type SortingDirection = 'ASC' | 'DESC';

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}

export interface LogInFormInputs {
  email: string;
  password: string;
  save: boolean;
}

export interface CommonEntityProps {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organization extends CommonEntityProps {
  title: string;
  description: string;
  properties: Record<string, unknown> | null;
  stands: string[];
}

export interface Application extends CommonEntityProps {
  title: string;
  description: string | null;
  properties: Record<string, unknown> | null;
  stands: string[];
  applicationCategoryId: string;
}

export interface ApplicationCategory extends CommonEntityProps {
  title: string;
  description: string | null;
  properties: Record<string, unknown> | null;
  applications: string[];
}

export interface StandCategory extends CommonEntityProps {
  title: string;
  description: string | null;
  properties: Record<string, unknown> | null;
  stands: string[];
}

export interface Stand extends CommonEntityProps {
  title: string;
  description: string | null;
  properties: Record<string, unknown> | null;
  standCategoryId: string;
  applicationId: string;
  organizationId: string | null;
}

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  description: string | null;
  role: Role;
  properties: Record<string, unknown>;
}

export interface LogInResponse {
  accessToken: string;
  user: User;
}

export interface GetApplicationsResponse {
  items: Application[];
  count: number;
}

export interface GetApplicationCategoriesResponse {
  items: ApplicationCategory[];
  count: number;
}

export interface GetStandsResponse {
  items: Stand[];
  count: number;
}

export interface GetStandCategoriesResponse {
  items: StandCategory[];
  count: number;
}

export interface GetOrganizationsResponse {
  items: Organization[];
  count: number;
}

export interface CatalogueColumnConfig {
  [k: string]: any;
}

export type FieldType = 'text' | 'color' | 'relationSelect' | 'markdown';

export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  [k: string]: any;
}

export interface EntityConfig {
  fields: FieldConfig[];
  catalogueColumns: CatalogueColumnConfig[];
}
