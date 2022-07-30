import { Form } from '@/constants/form';
import { EditApplicationFormInputs, EditOrganizationFormInputs, EditStandFormInputs, LogInFormInputs } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  redirectLinkAfterLogIn: string | null;
  forms: {
    [Form.LogIn]: LogInFormInputs | null;
    [Form.EditApplication]: EditApplicationFormInputs | null;
    [Form.EditStand]: EditStandFormInputs | null;
    [Form.EditOrganization]: EditOrganizationFormInputs | null;
  };
};

const initialState: UiState = {
  redirectLinkAfterLogIn: null,
  forms: {
    [Form.LogIn]: null,
    [Form.EditApplication]: null,
    [Form.EditStand]: null,
    [Form.EditOrganization]: null,
  },
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
    resetForms: () => {
      return initialState;
    },
  },
});

export const { setFormState, resetForms, setRedirectLinkAfterLogIn } = slice.actions;

export default slice.reducer;
