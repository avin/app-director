import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({

});

const resettableRootReducer = (state, action) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default resettableRootReducer;

export type RootState = ReturnType<typeof resettableRootReducer>;
