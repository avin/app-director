import config from '@/config';
import { Form } from '@/constants/form';
import { StandCategory, GetStandCategoriesResponse } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunkAction } from '../configureStore';
import { entitiesArrayToMap } from '@/utils/entitiesArrayToMap';
import { getIdsFromEntitiesArray } from '@/utils/getIdsFromEntitiesArray';
import { apiCall } from '@/store/reducers/data';

export type StandCategoriesState = {
  entities: Record<string, StandCategory>;
};

const initialState: StandCategoriesState = {
  entities: {},
};

const slice = createSlice({
  name: 'standCategories',
  initialState,
  reducers: {
    setStandCategories: (
      state,
      action: PayloadAction<Record<string, StandCategory>>,
    ) => {
      state.entities = {
        ...state.entities,
        ...action.payload,
      };
    },
    setStandCategory: (state, action: PayloadAction<StandCategory>) => {
      const standCategory = action.payload;
      state.entities[standCategory.id] = standCategory;
    },
  },
});

export const { setStandCategories, setStandCategory } = slice.actions;

export default slice.reducer;

export function getStandCategories(
  filters: any = {},
): AppThunkAction<Promise<{ ids: string[]; count: number }>> {
  return async (dispatch, getState) => {
    const {
      data: { items, count },
    } = await dispatch(
      apiCall<GetStandCategoriesResponse>({
        ...config.apiMethods.getStandCategories,
        params: filters,
      }),
    );
    dispatch(setStandCategories(entitiesArrayToMap(items)));

    return {
      ids: getIdsFromEntitiesArray(items),
      count,
    };
  };
}

export function getStandCategory(
  standCategoryId: string,
): AppThunkAction<Promise<StandCategory>> {
  return async (dispatch, getState) => {
    const { data } = await dispatch(
      apiCall<StandCategory>({
        ...config.apiMethods.getStandCategory,
        urlReplacements: {
          id: standCategoryId,
        },
      }),
    );
    dispatch(setStandCategory(data));

    return data;
  };
}

export function updateStandCategory(
  standCategoryId: string,
): AppThunkAction<Promise<StandCategory>> {
  return async (dispatch, getState) => {
    const editStandCategoryForm = getState().ui.forms[Form.EditStandCategory];

    const { data } = await dispatch(
      apiCall<StandCategory>({
        ...config.apiMethods.updateStandCategory,
        urlReplacements: {
          id: standCategoryId,
        },
        data: {
          ...editStandCategoryForm,
        },
      }),
    );

    dispatch(setStandCategory(data));

    return data;
  };
}

export function createStandCategory(): AppThunkAction<Promise<StandCategory>> {
  return async (dispatch, getState) => {
    const editStandCategoryForm = getState().ui.forms[Form.EditStandCategory];

    const { data } = await dispatch(
      apiCall<StandCategory>({
        ...config.apiMethods.createStandCategory,
        data: {
          ...editStandCategoryForm,
        },
      }),
    );

    dispatch(setStandCategory(data));

    return data;
  };
}
