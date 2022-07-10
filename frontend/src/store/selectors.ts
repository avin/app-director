import { RootState } from '@/store/reducers';
import { User } from '@/types';

export const userSelector = (state: RootState) => state.data.user as User;
