import { Form } from '@/constants/form';
import { EditApplicationFormInputs, LogInFormInputs } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiSettingsState = {
  forms: {
    [Form.LogIn]: LogInFormInputs | null;
    [Form.EditApplication]: EditApplicationFormInputs | null;
  };
};

const initialState: UiSettingsState = {
  forms: {
    [Form.LogIn]: null,
    [Form.EditApplication]: null,
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
    resetForms: () => {
      return initialState;
    },
  },
});

export const { setFormState, resetForms } = slice.actions;

export default slice.reducer;
