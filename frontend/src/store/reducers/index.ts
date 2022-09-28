import {
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
} from '@reduxjs/toolkit';
import data, { DataState } from './data';
import applications, { ApplicationsState } from './applications';
import stands, { StandsState } from './stands';
import organizations, { OrganizationsState } from './organizations';
import ui, { UiState } from './ui';
import applicationCategories, {
  ApplicationCategoriesState,
} from '@/store/reducers/applicationCategories';
import standCategories, { StandCategoriesState } from './standCategories';

export type RootState = CombinedState<{
  data: DataState;
  ui: UiState;
  applications: ApplicationsState;
  applicationCategories: ApplicationCategoriesState;
  stands: StandsState;
  standCategories: StandCategoriesState;
  organizations: OrganizationsState;
}>;

const rootReducer = combineReducers({
  data,
  applications,
  applicationCategories,
  stands,
  organizations,
  standCategories,
  ui,
});

const resettableRootReducer: Reducer = (
  state: RootState,
  action: AnyAction,
) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default resettableRootReducer;
