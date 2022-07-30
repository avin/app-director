import { AnyAction, CombinedState, combineReducers, Reducer } from '@reduxjs/toolkit';
import data, { DataState } from './data';
import applications, { ApplicationsState } from './applications';
import stands, { StandsState } from './stands';
import organizations, { OrganizationsState } from './organizations';
import ui, { UiState } from './ui';

export type RootState = CombinedState<{
  data: DataState;
  ui: UiState;
  applications: ApplicationsState;
  stands: StandsState;
  organizations: OrganizationsState;
}>;

const rootReducer = combineReducers({
  data,
  applications,
  stands,
  organizations,
  ui,
});

const resettableRootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default resettableRootReducer;
