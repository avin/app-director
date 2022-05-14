import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import configureStore from '@/store/configureStore';
import App from '@/components/root/App';
import { hideTsErrorsInConsole, prepareBrowser } from '@/utils/browser';
import config from '@/config';

hideTsErrorsInConsole();

void (() => {
  prepareBrowser();

  const store = configureStore();

  if (!window.location.pathname.startsWith(config.basename)) {
    window.location.pathname = config.basename;
  }

  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById('root'),
  );
})();
