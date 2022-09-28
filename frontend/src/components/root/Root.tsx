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
import CreateStand from '@/components/pages/stands/CreateStand/CreateStand';
import ViewStand from '@/components/pages/stands/ViewStand/ViewStand';
import EditStand from '@/components/pages/stands/EditStand/EditStand';
import NavigateOrganizations from '@/components/pages/organizations/NavigateOrganizations/NavigateOrganizations';
import CreateOrganization from '@/components/pages/organizations/CreateOrganization/CreateOrganization';
import ViewOrganization from '@/components/pages/organizations/ViewOrganization/ViewOrganization';
import EditOrganization from '@/components/pages/organizations/EditOrganization/EditOrganization';
import NavigateStands from '../pages/stands/NavigateStands/NavigateStands';
import LogNavigation from '@/components/common/LogNavigation/LogNavigation';
import ApplicationCategoryFetcherLayout from '../layouts/ApplicationCategoryFetcherLayout/ApplicationCategoryFetcherLayout';
import StandCategoryFetcherLayout from '@/components/layouts/StandCategoryFetcherLayout/StandCategoryFetcherLayout';
import NavigateApplicationCategories from '../pages/applicationCategories/NavigateApplicationCategories/NavigateApplicationCategories';
import CreateApplicationCategory from '../pages/applicationCategories/CreateApplicationCategory/CreateApplicationCategory';
import ViewApplicationCategory from '../pages/applicationCategories/ViewApplicationCategory/ViewApplicationCategory';
import EditApplicationCategory from '../pages/applicationCategories/EditApplicationCategory/EditApplicationCategory';
import NavigateStandCategories from '../pages/standCategories/NavigateStandCategories/NavigateStandCategories';
import CreateStandCategory from '../pages/standCategories/CreateStandCategory/CreateStandCategory';
import ViewStandCategory from '../pages/standCategories/ViewStandCategory/ViewStandCategory';
import EditStandCategory from '../pages/standCategories/EditStandCategory/EditStandCategory';
import UserRequiredLayout from '@/components/layouts/UserRequiredLayout/UserRequiredLayout';

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

        <Route element={<UserRequiredLayout />}>
          <Route element={<GeneralLayout />}>
            <Route path={routes.monitoring} element={<MonitoringPage />} />

            {/* -------- Applications -------- */}
            <Route
              path={routes.applications.$}
              element={<NavigateApplications />}
            />
            <Route
              path={routes.applications.create}
              element={<CreateApplication />}
            />

            <Route element={<ApplicationFetcherLayout />}>
              <Route
                path={routes.applications.view}
                element={<ViewApplication />}
              />
              <Route
                path={routes.applications.edit}
                element={<EditApplication />}
              />
            </Route>

            {/* -------- ApplicationCategories -------- */}
            <Route
              path={routes.applicationCategories.$}
              element={<NavigateApplicationCategories />}
            />
            <Route
              path={routes.applicationCategories.create}
              element={<CreateApplicationCategory />}
            />

            <Route element={<ApplicationCategoryFetcherLayout />}>
              <Route
                path={routes.applicationCategories.view}
                element={<ViewApplicationCategory />}
              />
              <Route
                path={routes.applicationCategories.edit}
                element={<EditApplicationCategory />}
              />
            </Route>

            {/* -------- StandCategories -------- */}
            <Route
              path={routes.standCategories.$}
              element={<NavigateStandCategories />}
            />
            <Route
              path={routes.standCategories.create}
              element={<CreateStandCategory />}
            />

            <Route element={<StandCategoryFetcherLayout />}>
              <Route
                path={routes.standCategories.view}
                element={<ViewStandCategory />}
              />
              <Route
                path={routes.standCategories.edit}
                element={<EditStandCategory />}
              />
            </Route>

            {/* -------- Stands -------- */}
            <Route path={routes.stands.$} element={<NavigateStands />} />
            <Route path={routes.stands.create} element={<CreateStand />} />

            <Route element={<StandFetcher />}>
              <Route path={routes.stands.view} element={<ViewStand />} />
              <Route path={routes.stands.edit} element={<EditStand />} />
            </Route>

            {/* -------- Organizations -------- */}
            <Route
              path={routes.organizations.$}
              element={<NavigateOrganizations />}
            />
            <Route
              path={routes.organizations.create}
              element={<CreateOrganization />}
            />

            <Route element={<OrganizationFetcherLayout />}>
              <Route
                path={routes.organizations.view}
                element={<ViewOrganization />}
              />
              <Route
                path={routes.organizations.edit}
                element={<EditOrganization />}
              />
            </Route>

            <Route path={routes.administration.users} element={<div />} />
            <Route path={routes.administration.log} element={<div />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </Provider>
);

export default Root;
