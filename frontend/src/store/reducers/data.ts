import { Application, Organization, Stand } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiSettingsState = {
  organizations: Record<string, Organization>;
  applications: Record<string, Application>;
  stands: Record<string, Stand>;
};

const initialState: UiSettingsState = {
  organizations: {},
  applications: {},
  stands: {},
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<Record<string, Organization>>) => {
      state.organizations = action.payload;
    },
    setApplications: (state, action: PayloadAction<Record<string, Application>>) => {
      state.applications = action.payload;
    },
    setStands: (state, action: PayloadAction<Record<string, Stand>>) => {
      state.stands = action.payload;
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const { setOrganizations, setApplications, setStands } = slice.actions;

export default slice.reducer;
