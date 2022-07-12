import config from '@/config';
import { Form } from '@/constants/form';
import { Application, LogInResponse, Organization, Stand, User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import type { AppThunkAction } from '../configureStore';
import { accessTokenSelector } from '@/store/selectors';

type EntitiesCollection<T> = {
  entities: Record<string, T>;
  ids: string[];
  page: number;
  perPage: number;
  total: number;
};

type DataState = {
  organizations: Record<string, Organization>;
  applications: Application[];
  stands: Record<string, Stand>;
  user: User | null;
  accessToken: string | null;
};

const initialState: DataState = {
  organizations: {},
  applications: [],
  stands: {},
  user: null,
  accessToken: null,
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<Record<string, Organization>>) => {
      state.organizations = action.payload;
    },
    setApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
    },
    setStands: (state, action: PayloadAction<Record<string, Stand>>) => {
      state.stands = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const { setOrganizations, setApplications, setStands, setUser, setAccessToken } = slice.actions;

export default slice.reducer;

export function apiCall<T>(params: AxiosRequestConfig): AppThunkAction<AxiosPromise<T>> {
  return async (dispatch, getState) => {
    const { headers, ...otherParams } = params;
    const token = accessTokenSelector(getState());

    const reqHeaders = { ...headers };

    if (token) {
      reqHeaders.Authorization = `Bearer ${token}`;
    }

    return axios({
      headers: reqHeaders,
      ...otherParams,
    });
  };
}

export function logIn(): AppThunkAction<Promise<void>> {
  return async (dispatch, getState) => {
    const logInForm = getState().ui.forms[Form.LogIn];

    if (!logInForm) {
      throw new Error('logInForm is null');
    }

    const {
      data: { user, accessToken },
    } = await dispatch(
      apiCall<LogInResponse>({
        ...config.apiMethods.logIn,
        data: {
          email: logInForm.email,
          password: logInForm.password,
        },
      }),
    );

    dispatch(setUser(user));
    dispatch(setAccessToken(accessToken));
  };
}

export function logOut(): AppThunkAction<void> {
  return (dispatch, getState) => {
    dispatch(setUser(null));
  };
}

export function getApplications(): AppThunkAction<Promise<void>> {
  return async (dispatch, getState) => {
    const { data } = await dispatch(
      apiCall<Application[]>({
        ...config.apiMethods.getApplications,
        data: {},
      }),
    );
    dispatch(setApplications(data));
  };
}
