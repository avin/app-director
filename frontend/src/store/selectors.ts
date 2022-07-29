import type { RootState } from '@/store/reducers';
import { Application, User } from '@/types';
import config from '@/config';

export const currentUserSelector = (state: RootState) => state.data.currentUser as User;

export const accessTokenSelector = (state: RootState) => state.data.accessToken;

export const applicationsSelector = (state: RootState) => state.data.applications;

export const standsSelector = (state: RootState) => state.data.stands;

export const applicationByIdSelector = (state: RootState, id: string): Application => state.data.applications[id];

export const redirectLinkAfterLogInSelector = (state: RootState): string =>
  state.ui.redirectLinkAfterLogIn || config.routes.monitoring;
