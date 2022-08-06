/**
 * Конфигурация проксирования http-запросов для локальной разработки (не учавствует в production-сборке приложения)
 */

const path = require('path');
const apiMocker = require('mocker-api');

module.exports = (app) => {
  apiMocker(app, path.resolve('./proxy/index.js'));
};
