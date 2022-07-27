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
    // application: '/applications/:id',
    newApplication: '/applications/new',
    organizations: '/organizations',
    stands: '/stands',
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
