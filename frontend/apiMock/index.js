const delay = require('mocker-api/utils/delay');
const assignIn = require('lodash/assignIn');

const apiPrefix = process.env.REACT_APP_BNPL_API_PREFIX || '/api';
const apiServer = process.env.REACT_APP_API_SERVER || 'localhost:3000';

const proxy = {
  _proxy: {
    proxy: {
      [`${apiPrefix}/(.*)`]: `http://${apiServer}/`,
    },
    pathRewrite: {
      '^/api/': '/',
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

    [`POST ${apiPrefix}/auth/signin`]: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVVNFUiIsImlkIjoiODkxNThkMjctODU2OS00MjA4LWEzM2UtOTI2ODY1MTI1MzdhIiwiaWF0IjoxNjU3NTk4MTY1LCJleHAiOjE2NTc2MDE3NjV9.8WcRMGvHCjFkLdGlyikaWvV2NHcDPeW8JbI9ZKKQ9vE',
      user: {
        role: 'USER',
        id: '89158d27-8569-4208-a33e-92686512537a',
        email: 'foo@bar.com',
        fullName: 'Avin Lambrero',
        description: null,
        properties: null,
      },
    },
  });
}

let delayValue = 300;
if (process.argv.includes('--no-delay')) {
  delayValue = 0;
}

module.exports = delay(proxy, delayValue);
