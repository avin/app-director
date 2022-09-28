import {
  Store,
  ThunkAction,
  Action,
  ThunkDispatch,
  configureStore as configureToolkitStore,
} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import type { RootState } from './reducers';

const configureStore = (initialState = {}): Store => {
  return configureToolkitStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
  });
};

export default configureStore;

export type AppThunkAction<T> = ThunkAction<
  T,
  RootState,
  unknown,
  Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<
  RootState,
  unknown,
  Action<string>
>;
