/**
 * App config
 */

import { capitalizeFirstLetter } from './utils/strings';
import { IconName } from '@blueprintjs/icons';

export class Config {
  apiPrefix = '/api';

  basename = document.querySelector('head base')?.getAttribute('href') || '';

  pageLoadingElementId = 'page-loading';

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

    const getEntityApiMethods = (singularName: string, pluralName: string) => {
      const singularNameWithUpperLetter = capitalizeFirstLetter(singularName);
      const pluralNameWithUpperLetter = capitalizeFirstLetter(pluralName);

      return {
        [`get${pluralNameWithUpperLetter}`]: {
          url: `${apiPrefix}/${pluralName}`,
          method: 'GET',
        },

        [`get${singularNameWithUpperLetter}`]: {
          url: `${apiPrefix}/${pluralName}/:id`,
          method: 'GET',
        },

        [`create${singularNameWithUpperLetter}`]: {
          url: `${apiPrefix}/${pluralName}`,
          method: 'POST',
        },

        [`update${singularNameWithUpperLetter}`]: {
          url: `${apiPrefix}/${pluralName}/:id`,
          method: 'PATCH',
        },

        [`delete${singularNameWithUpperLetter}`]: {
          url: `${apiPrefix}/${pluralName}/:id`,
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

      ...getEntityApiMethods('application', 'applications'),
      ...getEntityApiMethods('applicationCategory', 'applicationCategories'),
      ...getEntityApiMethods('standCategory', 'standCategories'),
      ...getEntityApiMethods('stand', 'stands'),
      ...getEntityApiMethods('organization', 'organizations'),
      ...getEntityApiMethods('user', 'users'),
    };
  }

  extendConfig(newConfigParams: { [key: string]: string }): void {
    Object.assign(this, newConfigParams);
  }
}

const config = new Config();

export default config;
