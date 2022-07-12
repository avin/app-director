import type { RootState } from '@/store/reducers';
import { Form } from '@/constants/form';
import { Role } from '@/constants/role';

export const storeState: RootState = {
  data: {
    organizations: {},
    applications: {},
    stands: {},
    user: {
      id: 'id1',
      email: 'test@test.com',
      fullName: 'Foo Bar',
      description: 'description here',
      role: Role.Admin,
      properties: {},
    },
    accessToken: null,
  },
  ui: {
    forms: {
      [Form.LogIn]: null,
    },
  },
};
