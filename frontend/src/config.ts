/**
 * App config
 */
export class Config {
  apiPrefix = '/api';

  basename = document.querySelector('head base')?.getAttribute('href') || '';

  pageLoadingElementId = 'page-loading';

  routes = {
    logIn: '/logIn',
    monitoring: '/monitoring',
    applications: {
      $: '/applications',
      create: '/applications/create',
      view: '/applications/:id',
      edit: '/applications/:id/edit',
    },
    stands: {
      $: '/stands',
      create: '/stands/create',
      view: '/stands/:id',
      edit: '/stands/:id/edit',
    },
    // application: '/applications/:id',
    newApplication: '/applications/new',
    organizations: '/organizations',
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
    };
  }

  extendConfig(newConfigParams: { [key: string]: string }): void {
    Object.assign(this, newConfigParams);
  }
}

const config = new Config();

export default config;
