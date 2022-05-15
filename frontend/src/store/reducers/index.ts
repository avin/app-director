import { combineReducers } from '@reduxjs/toolkit';
import ui from './ui';
import data from './data';

const rootReducer = combineReducers({
  ui,
  data,
});

const resettableRootReducer = (state, action) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default resettableRootReducer;

export type RootState = ReturnType<typeof resettableRootReducer>;
