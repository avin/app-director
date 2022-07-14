import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import ui from './ui';
import data from './data';
import type { UiSettingsState } from './ui';
import type { DataState } from './data';

const rootReducer = combineReducers({
  ui,
  data,
});

const resettableRootReducer = (state: { ui: UiSettingsState; data: DataState } | undefined, action: AnyAction) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default resettableRootReducer;

export type RootState = ReturnType<typeof resettableRootReducer>;
