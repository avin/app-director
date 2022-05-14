import { Form, LogInFormInputs } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiSettingsState = {
  [Form.LogIn]: LogInFormInputs | null;
};

const initialState: UiSettingsState = {
  [Form.LogIn]: null,
};

const slice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setFormState: (state, action: PayloadAction<{ formName: string; formState: unknown }>) => {
      const { formName, formState } = action.payload;

      state[formName] = formState;
    },
    resetForms: () => {
      return initialState;
    },
  },
});

export const { setFormState, resetForms } = slice.actions;

export default slice.reducer;
