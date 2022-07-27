import { AnyAction, CombinedState, combineReducers, Reducer } from '@reduxjs/toolkit';
import data, { DataState } from './data';
import ui, { UiState } from './ui';

export type RootState = CombinedState<{ data: DataState; ui: UiState }>;

const rootReducer = combineReducers({
  data,
  ui,
});

const resettableRootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default resettableRootReducer;
