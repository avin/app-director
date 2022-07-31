import { Store } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import config from '@/config';
import NotFoundPage from '../pages/other/NotFoundPage/NotFoundPage';
import LogInPage from '@/components/pages/auth/LogInPage/LogInPage';
import AuthLayout from '@/components/layouts/AuthLayout/AuthLayout';
import GeneralLayout from '../layouts/GeneralLayout/GeneralLayout';
import NavigateApplications from '../pages/applications/NavigateApplications/NavigateApplications';
import MonitoringPage from '../pages/general/MonitoringPage/MonitoringPage';
import ViewApplication from '@/components/pages/applications/ViewApplication/ViewApplication';
import CreateApplication from '@/components/pages/applications/CreateApplication/CreateApplication';
import EditApplication from '@/components/pages/applications/EditApplication/EditApplication';
import ApplicationFetcherLayout from '../layouts/ApplicationFetcherLayout/ApplicationFetcherLayout';
import StandFetcher from '@/components/layouts/StandFetcherLayout/StandFetcherLayout';
import OrganizationFetcherLayout from '@/components/layouts/OrganizationFetcherLayout/OrganizationFetcherLayout';
import StandsCatalogue from '@/components/pages/stands/StandsCatalogue/StandsCatalogue';
import CreateStand from '@/components/pages/stands/CreateStand/CreateStand';
import ViewStand from '@/components/pages/stands/ViewStand/ViewStand';
import EditStand from '@/components/pages/stands/EditStand/EditStand';
import NavigateOrganizations from '@/components/pages/organizations/NavigateOrganizations/NavigateOrganizations';
import CreateOrganization from '@/components/pages/organizations/CreateOrganization/CreateOrganization';
import ViewOrganization from '@/components/pages/organizations/ViewOrganization/ViewOrganization';
import EditOrganization from '@/components/pages/organizations/EditOrganization/EditOrganization';
import NavigateStands from '../pages/stands/NavigateStands/NavigateStands';
import LogNavigation from '@/components/common/LogNavigation/LogNavigation';

const { routes } = config;

export interface RootProps {
  store: Store;
}

const Root = ({ store }: RootProps) => (
  <Provider store={store}>
    <Router basename={config.basename}>
      <LogNavigation />

      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<AuthLayout />}>
          <Route path={routes.logIn} element={<LogInPage />} />
        </Route>

        <Route element={<GeneralLayout />}>
          <Route path={routes.monitoring} element={<MonitoringPage />} />

          {/* -------- Applications -------- */}
          <Route path={routes.applications.$} element={<NavigateApplications />} />
          <Route path={routes.applications.create} element={<CreateApplication />} />

          <Route element={<ApplicationFetcherLayout />}>
            <Route path={routes.applications.view} element={<ViewApplication />} />
            <Route path={routes.applications.edit} element={<EditApplication />} />
          </Route>

          {/* -------- Stands -------- */}
          <Route path={routes.stands.$} element={<NavigateStands />} />
          <Route path={routes.stands.create} element={<CreateStand />} />

          <Route element={<StandFetcher />}>
            <Route path={routes.stands.view} element={<ViewStand />} />
            <Route path={routes.stands.edit} element={<EditStand />} />
          </Route>

          {/* -------- Organizations -------- */}
          <Route path={routes.organizations.$} element={<NavigateOrganizations />} />
          <Route path={routes.organizations.create} element={<CreateOrganization />} />

          <Route element={<OrganizationFetcherLayout />}>
            <Route path={routes.organizations.view} element={<ViewOrganization />} />
            <Route path={routes.organizations.edit} element={<EditOrganization />} />
          </Route>

          <Route path={routes.administration.users} element={<div />} />
          <Route path={routes.administration.log} element={<div />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

export default Root;
