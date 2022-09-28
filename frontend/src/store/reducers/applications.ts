import config from '@/config';
import { Form } from '@/constants/form';
import { Application, GetApplicationsResponse } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunkAction } from '../configureStore';
import { entitiesArrayToMap } from '@/utils/entitiesArrayToMap';
import { getIdsFromEntitiesArray } from '@/utils/getIdsFromEntitiesArray';
import { apiCall } from '@/store/reducers/data';
import { getRelationIdsFromEntitiesArray } from '@/utils/getRelationIdsFromEntitiesArray';
import { getApplicationCategories } from '@/store/reducers/applicationCategories';

export type ApplicationsState = {
  entities: Record<string, Application>;
};

const initialState: ApplicationsState = {
  entities: {},
};

const slice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (
      state,
      action: PayloadAction<Record<string, Application>>,
    ) => {
      state.entities = {
        ...state.entities,
        ...action.payload,
      };
    },
    setApplication: (state, action: PayloadAction<Application>) => {
      const application = action.payload;
      state.entities[application.id] = application;
    },
  },
});

export const { setApplications, setApplication } = slice.actions;

export default slice.reducer;

export function getApplications(
  filters: any = {},
  withRelations: 'applicationCategory'[] = [],
): AppThunkAction<Promise<{ ids: string[]; count: number }>> {
  return async (dispatch, getState) => {
    const {
      data: { items, count },
    } = await dispatch(
      apiCall<GetApplicationsResponse>({
        ...config.apiMethods.getApplications,
        params: filters,
      }),
    );
    dispatch(setApplications(entitiesArrayToMap(items)));

    await Promise.all(
      [
        [
          'applicationCategory',
          'applicationCategoryId',
          'applicationCategories',
          getApplicationCategories,
        ] as const,
      ].reduce<Promise<unknown>[]>(
        (
          acc,
          [relationName, relationIdKey, entityStoreKey, getRelationAction],
        ) => {
          if (withRelations.includes(relationName)) {
            let ids = getRelationIdsFromEntitiesArray(items, relationIdKey);
            ids = ids.filter((id) => !getState()[entityStoreKey].entities[id]);
            if (ids.length) {
              acc.push(dispatch(getRelationAction({ ids })));
            }
          }
          return acc;
        },
        [],
      ),
    );

    return {
      ids: getIdsFromEntitiesArray(items),
      count,
    };
  };
}

export function getApplication(
  applicationId: string,
): AppThunkAction<Promise<Application>> {
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

export function updateApplication(
  applicationId: string,
): AppThunkAction<Promise<Application>> {
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
