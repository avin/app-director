import { Role } from '../../constants/role';

export interface JwtPayload {
  role: Role;
  id: string;
}
