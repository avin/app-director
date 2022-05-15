const delay = require('mocker-api/utils/delay');
const assignIn = require('lodash/assignIn');

const apiPrefix = process.env.REACT_APP_BNPL_API_PREFIX || '/api';
const apiServer = process.env.REACT_APP_API_SERVER || 'localhost:3000';

const proxy = {
  _proxy: {
    proxy: {
      [`${apiPrefix}/(.*)`]: `https://${apiServer}/`,
    },
    pathRewrite: {
      '^/cosmos/': '/',
    },
    changeHost: true,
    httpProxy: {
      options: {
        ignorePath: false,
      },
    },
  },
};

if (process.env.REACT_APP_FAKE_MODE === 'true') {
  assignIn(proxy, {
    [`GET ${apiPrefix}/version`]: {
      version: '0.1.0',
    },
  });
}

let delayValue = 300;
if (process.argv.includes('--no-delay')) {
  delayValue = 0;
}

module.exports = delay(proxy, delayValue);
