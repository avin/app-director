import config from '@/config';
import { Form } from '@/constants/form';
import { Organization, GetOrganizationsResponse } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunkAction } from '../configureStore';
import { entitiesArrayToMap } from '@/utils/entitiesArrayToMap';
import { getIdsFromEntitiesArray } from '@/utils/getIdsFromEntitiesArray';
import { apiCall } from '@/store/reducers/data';

export type OrganizationsState = {
  entities: Record<string, Organization>;
};

const initialState: OrganizationsState = {
  entities: {},
};

const slice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setOrganizations: (
      state,
      action: PayloadAction<Record<string, Organization>>,
    ) => {
      state.entities = {
        ...state.entities,
        ...action.payload,
      };
    },
    setOrganization: (state, action: PayloadAction<Organization>) => {
      const organization = action.payload;
      state.entities[organization.id] = organization;
    },
  },
});

export const { setOrganizations, setOrganization } = slice.actions;

export default slice.reducer;

export function getOrganizations(
  filters: any = {},
): AppThunkAction<Promise<{ ids: string[]; count: number }>> {
  return async (dispatch, getState) => {
    const {
      data: { items, count },
    } = await dispatch(
      apiCall<GetOrganizationsResponse>({
        ...config.apiMethods.getOrganizations,
        params: filters,
      }),
    );
    dispatch(setOrganizations(entitiesArrayToMap(items)));

    return {
      ids: getIdsFromEntitiesArray(items),
      count,
    };
  };
}

export function getOrganization(
  organizationId: string,
): AppThunkAction<Promise<Organization>> {
  return async (dispatch, getState) => {
    const { data } = await dispatch(
      apiCall<Organization>({
        ...config.apiMethods.getOrganization,
        urlReplacements: {
          id: organizationId,
        },
      }),
    );
    dispatch(setOrganization(data));

    return data;
  };
}

export function updateOrganization(
  organizationId: string,
): AppThunkAction<Promise<Organization>> {
  return async (dispatch, getState) => {
    const editOrganizationForm = getState().ui.forms[Form.EditOrganization];

    const { data } = await dispatch(
      apiCall<Organization>({
        ...config.apiMethods.updateOrganization,
        urlReplacements: {
          id: organizationId,
        },
        data: {
          ...editOrganizationForm,
        },
      }),
    );

    dispatch(setOrganization(data));

    return data;
  };
}

export function createOrganization(): AppThunkAction<Promise<Organization>> {
  return async (dispatch, getState) => {
    const editOrganizationForm = getState().ui.forms[Form.EditOrganization];

    const { data } = await dispatch(
      apiCall<Organization>({
        ...config.apiMethods.createOrganization,
        data: {
          ...editOrganizationForm,
        },
      }),
    );

    dispatch(setOrganization(data));

    return data;
  };
}
