import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import configureStore from '@/store/configureStore';
import Root from '@/components/root/Root';
import { hideTsErrorsInConsole, prepareBrowser } from '@/utils/browser';
import config from '@/config';

hideTsErrorsInConsole();

void (() => {
  prepareBrowser();

  const store = configureStore();

  if (!window.location.pathname.startsWith(config.basename)) {
    window.location.pathname = config.basename;
  }

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
})();
