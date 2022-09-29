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
          id: 'applicationCategoryId',
          type: 'relationSelect',
          relation: {
            relationTo: 'applicationCategory',
            single: true,
          },
          label: 'Категория приложения',
          required: true,
        },
        {
          id: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          id: 'properties.description',
          type: 'text',
          label: 'Описание',
          required: false,
        },
        {
          id: 'properties.notes',
          type: 'markdown',
          label: 'Заметки',
          required: false,
        },
      ],
      catalogueColumns: [
        {
          id: 'applicationCategory',
          type: 'relation',
          label: 'Категория',
          sortable: true,
          relation: {
            relationTo: 'applicationCategory',
            single: true,
          },
        },
        {
          id: 'title',
          type: 'text',
          text: {
            of: 'title',
          },
          label: 'Название',
          sortable: true,
        },
        {
          id: 'description',
          type: 'text',
          text: {
            of: 'properties.description',
          },
          label: 'Описание',
          sortable: true,
        },
        {
          id: 'standsCount',
          type: 'count',
          count: {
            of: 'stands',
          },
          label: 'Стенды',
          sortable: true,
        },
      ],
    },
    applicationCategory: {
      fields: [
        {
          id: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          id: 'properties.description',
          type: 'text',
          label: 'Описание',
          required: false,
        },
        {
          id: 'properties.tagBackgroundColor',
          type: 'color',
          label: 'Цвет фона у тега',
          required: true,
          defaultValue: '#111111',
        },
        {
          id: 'properties.tagTextColor',
          type: 'color',
          label: 'Цвет текста у тега',
          required: true,
          defaultValue: '#eeeeee',
        },
      ],
      catalogueColumns: [
        {
          id: 'title',
          type: 'text',
          text: {
            of: 'title',
          },
          label: 'Название',
          sortable: true,
        },
        {
          id: 'description',
          type: 'text',
          text: {
            of: 'properties.description',
          },
          label: 'Описание',
          sortable: true,
        },
        {
          id: 'applicationsCount',
          type: 'count',
          count: {
            of: 'applications',
          },
          label: 'Приложения',
          sortable: true,
        },
      ],
    },
    organization: {
      fields: [
        {
          id: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          id: 'properties.description',
          type: 'text',
          label: 'Описание',
          required: false,
        },
      ],
      catalogueColumns: [
        {
          id: 'title',
          type: 'text',
          text: {
            of: 'title',
          },
          label: 'Название',
          sortable: true,
        },
        {
          id: 'description',
          type: 'text',
          text: {
            of: 'properties.description',
          },
          label: 'Описание',
          sortable: true,
        },
        {
          id: 'standsCount',
          type: 'count',
          count: {
            of: 'stands',
          },
          label: 'Стенды',
          sortable: true,
        },
      ],
    },
    standCategory: {
      fields: [
        {
          id: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          id: 'properties.description',
          type: 'text',
          label: 'Описание',
          required: false,
        },
        {
          id: 'properties.tagBackgroundColor',
          type: 'color',
          label: 'Цвет фона у тега',
          required: true,
          defaultValue: '#111111',
        },
        {
          id: 'properties.tagTextColor',
          type: 'color',
          label: 'Цвет текста у тега',
          required: true,
          defaultValue: '#eeeeee',
        },
      ],
      catalogueColumns: [
        {
          id: 'title',
          type: 'text',
          text: {
            of: 'title',
          },
          label: 'Название',
          sortable: true,
        },
        {
          id: 'description',
          type: 'text',
          text: {
            of: 'properties.description',
          },
          label: 'Описание',
          sortable: true,
        },
        {
          id: 'standsCount',
          type: 'count',
          count: {
            of: 'stands',
          },
          label: 'Стенды',
          sortable: true,
        },
      ],
    },
    stand: {
      fields: [
        {
          id: 'standCategoryId',
          type: 'relationSelect',
          relation: {
            relationTo: 'standCategory',
            single: true,
          },
          label: 'Категория стенда',
          required: true,
        },
        {
          id: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          id: 'properties.description',
          type: 'text',
          label: 'Описание',
          required: false,
        },
        {
          id: 'applicationId',
          type: 'relationSelect',
          relation: {
            relationTo: 'application',
            single: true,
          },
          label: 'Приложение',
          required: true,
        },
        {
          id: 'organizationId',
          type: 'relationSelect',
          relation: {
            relationTo: 'organization',
            single: true,
          },
          label: 'Организация',
          required: true,
        },
      ],
      catalogueColumns: [
        {
          id: 'title',
          type: 'text',
          text: {
            of: 'title',
          },
          label: 'Название',
          sortable: true,
        },
        {
          id: 'description',
          type: 'text',
          text: {
            of: 'properties.description',
          },
          label: 'Описание',
          sortable: true,
        },
        {
          id: 'application',
          type: 'relation',
          label: 'Приложение',
          sortable: true,
          relation: {
            relationTo: 'application',
            single: true,
          },
        },
        {
          id: 'organization',
          type: 'relation',
          label: 'Организация',
          sortable: true,
          relation: {
            relationTo: 'organization',
            single: true,
          },
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
