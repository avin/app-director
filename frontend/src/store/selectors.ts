import type { RootState } from '@/store/reducers';
import { User } from '@/types';

export const currentUserSelector = (state: RootState) => state.data.currentUser as User;

export const accessTokenSelector = (state: RootState) => state.data.accessToken;

export const applicationsSelector = (state: RootState) => state.data.applications;
