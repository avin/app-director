import config from '@/config';
import { Form } from '@/constants/form';
import { ApplicationCategory, GetApplicationCategoriesResponse } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunkAction } from '../configureStore';
import { entitiesArrayToMap } from '@/utils/entitiesArrayToMap';
import { getIdsFromEntitiesArray } from '@/utils/getIdsFromEntitiesArray';
import { apiCall } from '@/store/reducers/data';

export type ApplicationCategoriesState = {
  entities: Record<string, ApplicationCategory>;
};

const initialState: ApplicationCategoriesState = {
  entities: {},
};

const slice = createSlice({
  name: 'applicationCategories',
  initialState,
  reducers: {
    setApplicationCategories: (
      state,
      action: PayloadAction<Record<string, ApplicationCategory>>,
    ) => {
      state.entities = {
        ...state.entities,
        ...action.payload,
      };
    },
    setApplicationCategory: (
      state,
      action: PayloadAction<ApplicationCategory>,
    ) => {
      const applicationCategory = action.payload;
      state.entities[applicationCategory.id] = applicationCategory;
    },
  },
});

export const { setApplicationCategories, setApplicationCategory } =
  slice.actions;

export default slice.reducer;

export function getApplicationCategories(
  filters: any = {},
): AppThunkAction<Promise<{ ids: string[]; count: number }>> {
  return async (dispatch, getState) => {
    const {
      data: { items, count },
    } = await dispatch(
      apiCall<GetApplicationCategoriesResponse>({
        ...config.apiMethods.getApplicationCategories,
        params: filters,
      }),
    );
    dispatch(setApplicationCategories(entitiesArrayToMap(items)));

    return {
      ids: getIdsFromEntitiesArray(items),
      count,
    };
  };
}

export function getApplicationCategory(
  applicationCategoryId: string,
): AppThunkAction<Promise<ApplicationCategory>> {
  return async (dispatch, getState) => {
    const { data } = await dispatch(
      apiCall<ApplicationCategory>({
        ...config.apiMethods.getApplicationCategory,
        urlReplacements: {
          id: applicationCategoryId,
        },
      }),
    );
    dispatch(setApplicationCategory(data));

    return data;
  };
}

export function updateApplicationCategory(
  applicationCategoryId: string,
): AppThunkAction<Promise<ApplicationCategory>> {
  return async (dispatch, getState) => {
    const editApplicationCategoryForm =
      getState().ui.forms[Form.EditApplicationCategory];

    const { data } = await dispatch(
      apiCall<ApplicationCategory>({
        ...config.apiMethods.updateApplicationCategory,
        urlReplacements: {
          id: applicationCategoryId,
        },
        data: {
          ...editApplicationCategoryForm,
        },
      }),
    );

    dispatch(setApplicationCategory(data));

    return data;
  };
}

export function createApplicationCategory(): AppThunkAction<
  Promise<ApplicationCategory>
> {
  return async (dispatch, getState) => {
    const editApplicationCategoryForm =
      getState().ui.forms[Form.EditApplicationCategory];

    const { data } = await dispatch(
      apiCall<ApplicationCategory>({
        ...config.apiMethods.createApplicationCategory,
        data: {
          ...editApplicationCategoryForm,
        },
      }),
    );

    dispatch(setApplicationCategory(data));

    return data;
  };
}
