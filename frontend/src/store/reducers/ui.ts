import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from 'history';

export type UiState = {
  redirectLinkAfterLogIn: string | null;
  forms: {};
  navigationLog: Location[];
};

const initialState: UiState = {
  redirectLinkAfterLogIn: null,
  forms: {},
  navigationLog: [],
};

const slice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setFormState: (
      state,
      action: PayloadAction<{ formName: string; formState: unknown }>,
    ) => {
      const { formName, formState } = action.payload;

      state.forms[formName] = formState;
    },
    setRedirectLinkAfterLogIn: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.redirectLinkAfterLogIn = action.payload;
    },
    addToNavigationLog: (state, action: PayloadAction<Location>) => {
      state.navigationLog.push(action.payload);
    },
    resetForms: () => {
      return initialState;
    },
  },
});

export const {
  setFormState,
  resetForms,
  setRedirectLinkAfterLogIn,
  addToNavigationLog,
} = slice.actions;

export default slice.reducer;
