/**
 * Конфигурация приложения.
 *
 * Для переопределении значений в production-сборке добавить в выходной после сборки файл
 * build/config.js по примеру build/config.example.js требуемые для перезаписи значения
 * (указывать только значения отличные от значений в текущем файле)
 */
export class Config {
  // Префикс сервиса BNPL (задается динамически)
  apiPrefix = '/api';

  // Basename ссылки приложения
  basename = document.querySelector('head base')?.getAttribute('href') || '';

  // ID элемента со спиннером который появляется до загрузки приложения
  pageLoadingElementId = 'page-loading';

  // Внутренние роуты приложения
  routes = {
    login: '/login',
    monitoring: '/monitoring',
    applications: '/applications',
    organizations: '/organizations',
    stands: '/stands',
    administration: {
      users: '/administration/users',
      log: '/administration/log',
    },
  };

  // Пути для API запросов
  get apiMethods(): {
    [key: string]: { path: string; method: string };
  } {
    const { apiPrefix } = this;

    return {
      version: {
        path: `${apiPrefix}/version`,
        method: 'GET',
      },
    };
  }

  /**
   * Расширить параметры конфигурации
   * @param newConfigParams
   */
  extendConfig(newConfigParams: { [key: string]: string }): void {
    Object.assign(this, newConfigParams);
  }
}

const config = new Config();

export default config;
