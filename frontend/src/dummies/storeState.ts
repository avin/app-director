import type { RootState } from '@/store/reducers';
import { Form } from '@/constants/form';

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
      role: 'ADMIN',
      properties: {},
    },
  },
  ui: {
    forms: {
      [Form.LogIn]: null,
    },
  },
};
