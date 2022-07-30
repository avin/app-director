import config from '@/config';
import { Form } from '@/constants/form';
import {
  Application,
  GetApplicationsResponse,
  GetOrganizationsResponse,
  GetStandsResponse,
  LogInResponse,
  Organization,
  Stand,
  User,
} from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { AppThunkAction } from '../configureStore';
import { accessTokenSelector } from '@/store/selectors';
import { entitiesArrayToMap } from '@/utils/entitiesArrayToMap';
import { getIdsFromEntitiesArray } from '@/utils/getIdsFromEntitiesArray';
import escapeRegExp from 'lodash/escapeRegExp';
import { generatePath } from 'react-router-dom';

export type DataState = {
  currentUser: User | null;
  accessToken: string | null;
};

const initialState: DataState = {
  currentUser: null,
  accessToken: null,
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    resetAuthData: (state) => {
      state.currentUser = null;
      state.accessToken = null;
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const { setCurrentUser, setAccessToken, resetData, resetAuthData } = slice.actions;

export default slice.reducer;

export function refreshTokens(): AppThunkAction<Promise<void>> {
  return async (dispatch, getState) => {
    try {
      const {
        data: { user, accessToken },
      } = await axios.request<LogInResponse>({
        url: config.apiMethods.refresh.url,
        method: config.apiMethods.refresh.method,
      });

      dispatch(setCurrentUser(user));
      dispatch(setAccessToken(accessToken));
    } catch (e) {
      dispatch(resetAuthData());

      throw e;
    }
  };
}

export function apiCall<T>(
  params: AxiosRequestConfig & { urlReplacements?: Record<string, string>; isAfterRefreshToken?: boolean },
): AppThunkAction<Promise<AxiosResponse<T>>> {
  return async (dispatch, getState) => {
    const { headers, urlReplacements, url, isAfterRefreshToken, ...otherParams } = params;
    const token = accessTokenSelector(getState());

    const reqHeaders = { ...headers };

    if (token) {
      reqHeaders.Authorization = `Bearer ${token}`;
    }

    const processedUrl = generatePath(url as string, urlReplacements);

    let result: AxiosResponse<T>;
    try {
      result = await axios.request<T>({
        url: processedUrl,
        headers: reqHeaders,
        ...otherParams,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 && !isAfterRefreshToken) {
          // попробовать обновить токен и выполнить запрос еще раз
          await dispatch(refreshTokens());

          return dispatch(
            apiCall({
              ...params,
              isAfterRefreshToken: true,
            }),
          );
        }
      }
      throw error;
    }
    return result;
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
          remember: logInForm.remember,
        },
      }),
    );

    dispatch(setCurrentUser(user));
    dispatch(setAccessToken(accessToken));
  };
}

export function logOut(): AppThunkAction<Promise<void>> {
  return async (dispatch, getState) => {
    await axios.request({
      url: config.apiMethods.logout.url,
      method: config.apiMethods.logout.method,
    });

    dispatch(resetAuthData());
  };
}
