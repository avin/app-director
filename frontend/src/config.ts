/**
 * App config
 */

import { capitalizeFirstLetter, pluralize } from './utils/strings';
import { IconName } from '@blueprintjs/icons';
import { EntityConfig } from '@/types';

export class Config {
  apiPrefix = '/api';

  basename = document.querySelector('head base')?.getAttribute('href') || '';

  pageLoadingElementId = 'page-loading';

  entities: Record<string, EntityConfig> = {
    application: {
      fields: [
        {
          name: 'applicationCategoryId',
          type: 'relationSelect',
          relation: {
            relationTo: 'applicationCategory',
            single: true,
          },
          label: 'Категория приложения',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'properties.description',
          type: 'text',
          label: 'Описание',
          required: false,
        },
        {
          name: 'properties.notes',
          type: 'markdown',
          label: 'Заметки',
          required: false,
        },
      ],
    },
    applicationCategory: {
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'properties.description',
          type: 'text',
          label: 'Описание',
          required: false,
        },
      ],
    },
    organization: {
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'properties.description',
          type: 'text',
          label: 'Описание',
          required: false,
        },
      ],
    },
    standCategory: {
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'properties.description',
          type: 'text',
          label: 'Описание',
          required: false,
        },
      ],
    },
    stand: {
      fields: [
        {
          name: 'standCategoryId',
          type: 'relationSelect',
          relation: {
            relationTo: 'standCategory',
            single: true,
          },
          label: 'Категория стенда',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'properties.description',
          type: 'text',
          label: 'Описание',
          required: false,
        },
        {
          name: 'applicationId',
          type: 'relationSelect',
          relation: {
            relationTo: 'application',
            single: true,
          },
          label: 'Приложение',
          required: true,
        },
        {
          name: 'organizationId',
          type: 'relationSelect',
          relation: {
            relationTo: 'organization',
            single: true,
          },
          label: 'Организация',
          required: true,
        },
      ],
    },
  };

  defaultIcons: Record<string, IconName> = {
    application: 'application',
    applicationCategory: 'applications',
    standCategory: 'cloud',
    stand: 'cloud',
    organization: 'office',
  };

  routes = {
    logIn: '/logIn',
    monitoring: '/monitoring',
    applications: {
      $: '/applications',
      create: '/applications/create',
      view: '/applications/:id',
      edit: '/applications/:id/edit',
    },
    applicationCategories: {
      $: '/applicationCategories',
      create: '/applicationCategories/create',
      view: '/applicationCategories/:id',
      edit: '/applicationCategories/:id/edit',
    },
    standCategories: {
      $: '/standCategories',
      create: '/standCategories/create',
      view: '/standCategories/:id',
      edit: '/standCategories/:id/edit',
    },
    stands: {
      $: '/stands',
      create: '/stands/create',
      view: '/stands/:id',
      edit: '/stands/:id/edit',
    },
    organizations: {
      $: '/organizations',
      create: '/organizations/create',
      view: '/organizations/:id',
      edit: '/organizations/:id/edit',
    },
    administration: {
      users: '/administration/users',
      log: '/administration/log',
    },
  };

  get apiMethods(): {
    [key: string]: { url: string; method: string };
  } {
    const { apiPrefix } = this;

    const getEntityApiMethods = (entityType: string) => {
      const pluralEntityType = pluralize(entityType);
      const entityTypeWithUpperLetter = capitalizeFirstLetter(entityType);
      const pluralEntityTypeWithUpperLetter =
        capitalizeFirstLetter(pluralEntityType);

      return {
        [`get${pluralEntityTypeWithUpperLetter}`]: {
          url: `${apiPrefix}/${pluralEntityType}`,
          method: 'GET',
        },

        [`get${entityTypeWithUpperLetter}`]: {
          url: `${apiPrefix}/${pluralEntityType}/:id`,
          method: 'GET',
        },

        [`create${entityTypeWithUpperLetter}`]: {
          url: `${apiPrefix}/${pluralEntityType}`,
          method: 'POST',
        },

        [`update${entityTypeWithUpperLetter}`]: {
          url: `${apiPrefix}/${pluralEntityType}/:id`,
          method: 'PATCH',
        },

        [`delete${entityTypeWithUpperLetter}`]: {
          url: `${apiPrefix}/${pluralEntityType}/:id`,
          method: 'DELETE',
        },
      };
    };

    return {
      version: {
        url: `${apiPrefix}/version`,
        method: 'GET',
      },

      // ------- Auth -------

      logIn: {
        url: `${apiPrefix}/auth/signin`,
        method: 'POST',
      },

      refresh: {
        url: `${apiPrefix}/auth/refresh`,
        method: 'GET',
      },

      logout: {
        url: `${apiPrefix}/auth/logout`,
        method: 'GET',
      },

      // ------- Entities -------

      ...getEntityApiMethods('application'),
      ...getEntityApiMethods('applicationCategory'),
      ...getEntityApiMethods('standCategory'),
      ...getEntityApiMethods('stand'),
      ...getEntityApiMethods('organization'),
      ...getEntityApiMethods('user'),
    };
  }

  extendConfig(newConfigParams: { [key: string]: string }): void {
    Object.assign(this, newConfigParams);
  }
}

const config = new Config();

export default config;
