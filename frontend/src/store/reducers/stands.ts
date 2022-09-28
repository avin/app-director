import config from '@/config';
import { Form } from '@/constants/form';
import { Stand, GetStandsResponse } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunkAction } from '../configureStore';
import { entitiesArrayToMap } from '@/utils/entitiesArrayToMap';
import { getIdsFromEntitiesArray } from '@/utils/getIdsFromEntitiesArray';
import { apiCall } from '@/store/reducers/data';
import { getRelationIdsFromEntitiesArray } from '@/utils/getRelationIdsFromEntitiesArray';
import { getOrganizations } from '@/store/reducers/organizations';
import { getApplications } from '@/store/reducers/applications';
import { getStandCategories } from '@/store/reducers/standCategories';

export type StandsState = {
  entities: Record<string, Stand>;
};

const initialState: StandsState = {
  entities: {},
};

const slice = createSlice({
  name: 'stands',
  initialState,
  reducers: {
    setStands: (state, action: PayloadAction<Record<string, Stand>>) => {
      state.entities = {
        ...state.entities,
        ...action.payload,
      };
    },
    setStand: (state, action: PayloadAction<Stand>) => {
      const stand = action.payload;
      state.entities[stand.id] = stand;
    },
  },
});

export const { setStands, setStand } = slice.actions;

export default slice.reducer;

export function getStands(
  filters: any = {},
  withRelations: ('organization' | 'application' | 'standCategory')[] = [],
): AppThunkAction<Promise<{ ids: string[]; count: number }>> {
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

    await Promise.all(
      [
        [
          'organization',
          'organizationId',
          'organizations',
          getOrganizations,
        ] as const,
        [
          'application',
          'applicationId',
          'applications',
          getApplications,
        ] as const,
        [
          'standCategory',
          'standCategoryId',
          'standCategories',
          getStandCategories,
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

export function getStand(standId: string): AppThunkAction<Promise<Stand>> {
  return async (dispatch, getState) => {
    const { data } = await dispatch(
      apiCall<Stand>({
        ...config.apiMethods.getStand,
        urlReplacements: {
          id: standId,
        },
      }),
    );
    dispatch(setStand(data));

    return data;
  };
}

export function updateStand(standId: string): AppThunkAction<Promise<Stand>> {
  return async (dispatch, getState) => {
    const editStandForm = getState().ui.forms[Form.EditStand];

    const { data } = await dispatch(
      apiCall<Stand>({
        ...config.apiMethods.updateStand,
        urlReplacements: {
          id: standId,
        },
        data: {
          ...editStandForm,
        },
      }),
    );

    dispatch(setStand(data));

    return data;
  };
}

export function createStand(): AppThunkAction<Promise<Stand>> {
  return async (dispatch, getState) => {
    const editStandForm = getState().ui.forms[Form.EditStand];

    const { data } = await dispatch(
      apiCall<Stand>({
        ...config.apiMethods.createStand,
        data: {
          ...editStandForm,
        },
      }),
    );

    dispatch(setStand(data));

    return data;
  };
}
