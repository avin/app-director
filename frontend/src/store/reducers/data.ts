import config from '@/config';
import { Form } from '@/constants/form';
import {
  Application,
  GetApplicationsResponse,
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

export type DataState = {
  organizations: Record<string, Organization>;
  applications: Record<string, Application>;
  stands: Record<string, Stand>;
  users: Record<string, User>;
  currentUser: User | null;
  accessToken: string | null;
};

const initialState: DataState = {
  organizations: {},
  applications: {},
  stands: {},
  users: {},
  currentUser: null,
  accessToken: null,
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<Record<string, Organization>>) => {
      state.organizations = {
        ...state.organizations,
        ...action.payload,
      };
    },
    setApplications: (state, action: PayloadAction<Record<string, Application>>) => {
      state.applications = {
        ...state.applications,
        ...action.payload,
      };
    },
    setApplication: (state, action: PayloadAction<Application>) => {
      const application = action.payload;
      state.applications[application.id] = application;
    },
    setStands: (state, action: PayloadAction<Record<string, Stand>>) => {
      state.stands = {
        ...state.stands,
        ...action.payload,
      };
    },
    setUsers: (state, action: PayloadAction<Record<string, User>>) => {
      state.users = {
        ...state.users,
        ...action.payload,
      };
    },
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

export const {
  setOrganizations,
  setApplications,
  setApplication,
  setStands,
  setUsers,
  setCurrentUser,
  setAccessToken,
  resetData,
  resetAuthData,
} = slice.actions;

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

    const processedUrl = (() => {
      let result = url as string;
      if (urlReplacements) {
        Object.entries(urlReplacements).forEach(([key, value]) => {
          result = result.replace(new RegExp(escapeRegExp(`:${key}`), 'g'), value);
        });
      }
      return result;
    })();

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

// -------------------
// Applications
// -------------------

export function getApplications(): AppThunkAction<Promise<{ ids: string[]; count: number }>> {
  return async (dispatch, getState) => {
    const {
      data: { items, count },
    } = await dispatch(
      apiCall<GetApplicationsResponse>({
        ...config.apiMethods.getApplications,
        data: {},
      }),
    );
    dispatch(setApplications(entitiesArrayToMap(items)));

    return {
      ids: getIdsFromEntitiesArray(items),
      count,
    };
  };
}
export function getApplication(applicationId: string): AppThunkAction<Promise<Application>> {
  return async (dispatch, getState) => {
    const { data } = await dispatch(
      apiCall<Application>({
        ...config.apiMethods.getApplication,
        urlReplacements: {
          id: applicationId,
        },
      }),
    );
    dispatch(setApplication(data));

    return data;
  };
}

export function updateApplication(applicationId: string): AppThunkAction<Promise<Application>> {
  return async (dispatch, getState) => {
    const editApplicationForm = getState().ui.forms[Form.EditApplication];

    const { data } = await dispatch(
      apiCall<Application>({
        ...config.apiMethods.updateApplication,
        urlReplacements: {
          id: applicationId,
        },
        data: {
          ...editApplicationForm,
        },
      }),
    );

    dispatch(setApplication(data));

    return data;
  };
}

export function createApplication(): AppThunkAction<Promise<Application>> {
  return async (dispatch, getState) => {
    const editApplicationForm = getState().ui.forms[Form.EditApplication];

    const { data } = await dispatch(
      apiCall<Application>({
        ...config.apiMethods.createApplication,
        data: {
          ...editApplicationForm,
        },
      }),
    );

    dispatch(setApplication(data));

    return data;
  };
}

// -------------------
// Stands
// -------------------

export function getStands(filters: any = {}): AppThunkAction<Promise<{ ids: string[]; count: number }>> {
  return async (dispatch, getState) => {
    const {
      data: { items, count },
    } = await dispatch(
      apiCall<GetStandsResponse>({
        ...config.apiMethods.getStands,
        params: filters,
      }),
    );
    dispatch(setStands(entitiesArrayToMap(items)));

    return {
      ids: getIdsFromEntitiesArray(items),
      count,
    };
  };
}
