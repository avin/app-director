import type { RootState } from '@/store/reducers';
import { Application, Organization, Stand, User } from '@/types';
import config from '@/config';
import { Location } from 'history';

export const currentUserSelector = (state: RootState) => state.data.currentUser as User;

export const accessTokenSelector = (state: RootState) => state.data.accessToken;

export const applicationsSelector = (state: RootState) => state.applications.entities;
export const standsSelector = (state: RootState) => state.stands.entities;
export const organizationsSelector = (state: RootState) => state.organizations.entities;

export const applicationByIdSelector = (state: RootState, id: string): Application => state.applications.entities[id];
export const standByIdSelector = (state: RootState, id: string): Stand => state.stands.entities[id];
export const organizationByIdSelector = (state: RootState, id: string): Organization =>
  state.organizations.entities[id];

export const redirectLinkAfterLogInSelector = (state: RootState): string =>
  state.ui.redirectLinkAfterLogIn || config.routes.monitoring;

export const previousLocationSelector = (state: RootState): Location | undefined =>
  state.ui.navigationLog[state.ui.navigationLog.length - 1];
