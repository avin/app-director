import { combineReducers } from '@reduxjs/toolkit';
import forms from './forms';

const rootReducer = combineReducers({
  forms,
});

const resettableRootReducer = (state, action) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default resettableRootReducer;

export type RootState = ReturnType<typeof resettableRootReducer>;
