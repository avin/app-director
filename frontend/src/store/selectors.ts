import type { RootState } from '@/store/reducers';
import { User } from '@/types';

export const userSelector = (state: RootState) => state.data.user as User;

export const accessTokenSelector = (state: RootState) => state.data.accessToken;
