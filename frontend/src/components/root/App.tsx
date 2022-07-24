import { Store } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import config from '@/config';
import NotFoundPage from '../pages/other/NotFoundPage/NotFoundPage';
import LogInPage from '@/components/pages/auth/LogInPage/LogInPage';
import AuthLayout from '@/components/layouts/AuthLayout/AuthLayout';
import GeneralLayout from '../layouts/GeneralLayout/GeneralLayout';
import ApplicationsPage from '../pages/general/ApplicationsPage/ApplicationsPage';
import MonitoringPage from '../pages/general/MonitoringPage/MonitoringPage';
import OrganizationsPage from '../pages/general/OrganizationsPage/OrganizationsPage';
import StandsPage from '../pages/general/StandsPage/StandsPage';
import AdministrationUsersPage from '../pages/general/AdministrationUsersPage/AdministrationUsersPage';
import AdministrationLogPage from '../pages/general/AdministrationLogPage/AdministrationLogPage';
import ApplicationPage from '../pages/general/ApplicationPage/ApplicationPage';

const { routes } = config;

export interface RootProps {
  store: Store;
}

const App = ({ store }: RootProps) => (
  <Provider store={store}>
    <Router basename={config.basename}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<AuthLayout />}>
          <Route path={routes.logIn} element={<LogInPage />} />
        </Route>

        <Route element={<GeneralLayout />}>
          <Route path={routes.monitoring} element={<MonitoringPage />} />
          <Route path={routes.applications} element={<ApplicationsPage />} />
          <Route path={routes.application} element={<ApplicationPage />} />
          <Route path={routes.organizations} element={<OrganizationsPage />} />
          <Route path={routes.stands} element={<StandsPage />} />
          <Route path={routes.administration.users} element={<AdministrationUsersPage />} />
          <Route path={routes.administration.log} element={<AdministrationLogPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

export default App;
