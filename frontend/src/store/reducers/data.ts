import config from '@/config';
import { Form } from '@/constants/form';
import { Application, GetApplicationsResponse, LogInResponse, Organization, Stand, User } from '@/types';
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
    resetData: () => {
      return initialState;
    },
  },
});

export const { setOrganizations, setApplications, setStands, setUsers, setCurrentUser, setAccessToken, resetData } =
  slice.actions;

export default slice.reducer;

export function apiCall<T>(
  params: AxiosRequestConfig & { urlReplacements?: Record<string, string> },
): AppThunkAction<Promise<AxiosResponse<T>>> {
  return async (dispatch, getState) => {
    const { headers, urlReplacements, url, ...otherParams } = params;
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
      result = (await axios({
        url: processedUrl,
        headers: reqHeaders,
        ...otherParams,
      })) as AxiosResponse<T>;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // TODO попробовать обновить токен и выполнить запрос еще раз
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
        },
      }),
    );

    dispatch(setCurrentUser(user));
    dispatch(setAccessToken(accessToken));
  };
}

export function logOut(): AppThunkAction<void> {
  return (dispatch, getState) => {
    dispatch(setCurrentUser(null));
    dispatch(setAccessToken(null));
  };
}

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

export function updateApplication(applicationId: string): AppThunkAction<Promise<void>> {
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

    dispatch(
      setApplications({
        ...getState().data.applications,
        [applicationId]: data,
      }),
    );
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

    dispatch(
      setApplications({
        ...getState().data.applications,
        [data.id]: data,
      }),
    );

    return data;
  };
}
