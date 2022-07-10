import config from '@/config';
import { Form } from '@/constants/form';
import { Application, Organization, Stand, User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import type { AppThunkAction } from '../configureStore';

type UiSettingsState = {
  organizations: Record<string, Organization>;
  applications: Record<string, Application>;
  stands: Record<string, Stand>;
  user: User | null;
};

const initialState: UiSettingsState = {
  organizations: {},
  applications: {},
  stands: {},
  user: null,
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<Record<string, Organization>>) => {
      state.organizations = action.payload;
    },
    setApplications: (state, action: PayloadAction<Record<string, Application>>) => {
      state.applications = action.payload;
    },
    setStands: (state, action: PayloadAction<Record<string, Stand>>) => {
      state.stands = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const { setOrganizations, setApplications, setStands, setUser } = slice.actions;

export default slice.reducer;

export function apiCall<T>(params: AxiosRequestConfig): AppThunkAction<AxiosPromise<T>> {
  const { headers, ...otherParams } = params;
  const token = '123';

  const reqHeaders = { ...headers };

  if (token) {
    reqHeaders.Authorization = `Bearer ${token}`;
  }

  return async (dispatch, getState) => {
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

    const { data } = await dispatch(
      apiCall<User>({
        ...config.apiMethods.logIn,
        data: {
          email: logInForm.email,
          password: logInForm.password,
        },
      }),
    );

    console.log(data);

    dispatch(setUser(data));
  };
}

export function logOut(): AppThunkAction<void> {
  return (dispatch, getState) => {
    dispatch(setUser(null));
  };
}
