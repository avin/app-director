import { Store } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import config from '@/config';
import NotFoundPage from '../pages/other/NotFoundPage/NotFoundPage';
import LogInPage from '@/components/pages/login/LogInPage/LogInPage';
import AuthLayout from '@/components/layouts/AuthLayout/AuthLayout';

const { routes } = config;

export interface RootProps {
  store: Store;
}

const App = ({ store }: RootProps): JSX.Element => (
  <Provider store={store}>
    <Router basename={config.basename}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<AuthLayout />}>
          <Route path={routes.login} element={<LogInPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

export default App;
