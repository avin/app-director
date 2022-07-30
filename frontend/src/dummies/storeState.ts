import type { RootState } from '@/store/reducers';
import { Form } from '@/constants/form';
import { Role } from '@/constants/role';
import { generateApplication, generateOrganization, generateStand } from '@/dummies/entites';

export const storeState: RootState = {
  data: {
    currentUser: {
      id: 'id1',
      email: 'test@test.com',
      fullName: 'Foo Bar',
      description: 'description here',
      role: Role.Admin,
      properties: {},
    },
    accessToken: null,
  },
  applications: {
    entities: (() => {
      const entity = generateApplication({ id: '00000000-0000-0000-0000-000000000000' });
      return {
        [entity.id]: entity,
      };
    })(),
  },
  stands: {
    entities: (() => {
      const entity = generateStand({ id: '00000000-0000-0000-0000-000000000000' });
      return {
        [entity.id]: entity,
      };
    })(),
  },
  organizations: {
    entities: (() => {
      const entity = generateOrganization({ id: '00000000-0000-0000-0000-000000000000' });
      return {
        [entity.id]: entity,
      };
    })(),
  },
  ui: {
    forms: {
      [Form.LogIn]: null,
      [Form.EditApplication]: null,
      [Form.EditStand]: null,
      [Form.EditOrganization]: null,
    },
    redirectLinkAfterLogIn: null,
  },
};
