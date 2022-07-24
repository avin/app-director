import type { RootState } from '@/store/reducers';
import { Application, User } from '@/types';

export const currentUserSelector = (state: RootState) => state.data.currentUser as User;

export const accessTokenSelector = (state: RootState) => state.data.accessToken;

export const applicationsSelector = (state: RootState) => state.data.applications;

export const applicationByIdSelector = (state: RootState, id: string): Application | undefined =>
  state.data.applications[id];
