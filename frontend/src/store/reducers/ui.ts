import { Form } from '@/constants/form';
import { ApplicationEditFormInputs, OrganizationEditFormInputs, StandEditFormInputs, LogInFormInputs } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from 'history';

export type UiState = {
  redirectLinkAfterLogIn: string | null;
  forms: {
    [Form.LogIn]: LogInFormInputs | null;
    [Form.EditApplication]: ApplicationEditFormInputs | null;
    [Form.EditStand]: StandEditFormInputs | null;
    [Form.EditOrganization]: OrganizationEditFormInputs | null;
  };
  navigationLog: Location[];
};

const initialState: UiState = {
  redirectLinkAfterLogIn: null,
  forms: {
    [Form.LogIn]: null,
    [Form.EditApplication]: null,
    [Form.EditStand]: null,
    [Form.EditOrganization]: null,
  },
  navigationLog: [],
};

const slice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setFormState: (state, action: PayloadAction<{ formName: string; formState: unknown }>) => {
      const { formName, formState } = action.payload;

      state.forms[formName] = formState;
    },
    setRedirectLinkAfterLogIn: (state, action: PayloadAction<string | null>) => {
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

export const { setFormState, resetForms, setRedirectLinkAfterLogIn, addToNavigationLog } = slice.actions;

export default slice.reducer;
