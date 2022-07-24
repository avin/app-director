import { Store } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import config from '@/config';
import NotFoundPage from '../pages/other/NotFoundPage/NotFoundPage';
import LogInPage from '@/components/pages/auth/LogInPage/LogInPage';
import AuthLayout from '@/components/layouts/AuthLayout/AuthLayout';
import GeneralLayout from '../layouts/GeneralLayout/GeneralLayout';
import ApplicationsCatalogue from '../pages/general/applications/ApplicationsCatalogue/ApplicationsCatalogue';
import MonitoringPage from '../pages/general/MonitoringPage/MonitoringPage';
import OrganizationsPage from '../pages/general/OrganizationsPage/OrganizationsPage';
import StandsPage from '../pages/general/StandsPage/StandsPage';
import AdministrationUsersPage from '../pages/general/AdministrationUsersPage/AdministrationUsersPage';
import AdministrationLogPage from '../pages/general/AdministrationLogPage/AdministrationLogPage';
import ViewApplication from '@/components/pages/general/applications/ViewApplication/ViewApplication';
import CreateApplication from '@/components/pages/general/applications/CreateApplication/CreateApplication';
import EditApplication from '@/components/pages/general/applications/EditApplication/EditApplication';
import ApplicationFetcher from '../pages/general/applications/ApplicationFetcher/ApplicationFetcher';

const { routes } = config;

export interface RootProps {
  store: Store;
}

const Root = ({ store }: RootProps) => (
  <Provider store={store}>
    <Router basename={config.basename}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<AuthLayout />}>
          <Route path={routes.logIn} element={<LogInPage />} />
        </Route>

        <Route element={<GeneralLayout />}>
          <Route path={routes.monitoring} element={<MonitoringPage />} />

          <Route path={routes.applications.$} element={<ApplicationsCatalogue />} />
          <Route path={routes.applications.create} element={<CreateApplication />} />

          <Route element={<ApplicationFetcher />}>
            <Route path={routes.applications.view} element={<ViewApplication />} />
            <Route path={routes.applications.edit} element={<EditApplication />} />
          </Route>

          <Route path={routes.organizations} element={<OrganizationsPage />} />
          <Route path={routes.stands} element={<StandsPage />} />
          <Route path={routes.administration.users} element={<AdministrationUsersPage />} />
          <Route path={routes.administration.log} element={<AdministrationLogPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

export default Root;
