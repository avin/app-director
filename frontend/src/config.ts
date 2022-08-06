/**
 * App config
 */

export class Config {
  apiPrefix = '/api';

  basename = document.querySelector('head base')?.getAttribute('href') || '';

  pageLoadingElementId = 'page-loading';

  defaultIcons = {
    application: 'application' as const,
    applicationCategory: 'applications' as const,
    standCategory: 'cloud' as const,
    stand: 'cloud' as const,
    organization: 'office' as const,
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

      // ------- Applications -------

      getApplications: {
        url: `${apiPrefix}/applications`,
        method: 'GET',
      },

      getApplication: {
        url: `${apiPrefix}/applications/:id`,
        method: 'GET',
      },

      createApplication: {
        url: `${apiPrefix}/applications`,
        method: 'POST',
      },

      updateApplication: {
        url: `${apiPrefix}/applications/:id`,
        method: 'PATCH',
      },

      deleteApplication: {
        url: `${apiPrefix}/applications/:id`,
        method: 'DELETE',
      },

      // ------- Stands -------

      getStands: {
        url: `${apiPrefix}/stands`,
        method: 'GET',
      },

      getStand: {
        url: `${apiPrefix}/stands/:id`,
        method: 'GET',
      },

      createStand: {
        url: `${apiPrefix}/stands`,
        method: 'POST',
      },

      updateStand: {
        url: `${apiPrefix}/stands/:id`,
        method: 'PATCH',
      },

      deleteStand: {
        url: `${apiPrefix}/stands/:id`,
        method: 'DELETE',
      },

      // ------- Organizations -------

      getOrganizations: {
        url: `${apiPrefix}/organizations`,
        method: 'GET',
      },

      getOrganization: {
        url: `${apiPrefix}/organizations/:id`,
        method: 'GET',
      },

      createOrganization: {
        url: `${apiPrefix}/organizations`,
        method: 'POST',
      },

      updateOrganization: {
        url: `${apiPrefix}/organizations/:id`,
        method: 'PATCH',
      },

      deleteOrganization: {
        url: `${apiPrefix}/organizations/:id`,
        method: 'DELETE',
      },
    };
  }

  extendConfig(newConfigParams: { [key: string]: string }): void {
    Object.assign(this, newConfigParams);
  }
}

const config = new Config();

export default config;
