import { Form } from '@/constants/form';
import { LogInFormInputs } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiSettingsState = {
  forms: {
    [Form.LogIn]: LogInFormInputs | null;
  };
};

const initialState: UiSettingsState = {
  forms: {
    [Form.LogIn]: null,
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
