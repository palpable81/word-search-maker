import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  displayAnimation: boolean,
  allowDiagonal: boolean,
  allowBackwards: boolean,
}

const initialState: SettingsState = {
  displayAnimation: true,
  allowDiagonal: false,
  allowBackwards: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    toggleAnimation: (state) => {
      state.displayAnimation = !state.displayAnimation;
    },
    setDiagonal: (state, action: PayloadAction<boolean>) => {
      state.allowDiagonal = action.payload;
    },
    setBackwards: (state, action: PayloadAction<boolean>) => {
      state.allowBackwards = action.payload;
    },
  }
});

export const { toggleAnimation, setDiagonal, setBackwards } = settingsSlice.actions;

export const selectDisplayAnimation = (state: any) => state.settings.displayAnimation;
export const selectAllowDiagonal = (state: any) => state.settings.allowDiagonal;
export const selectAllowBackwards = (state: any) => state.settings.allowBackwards;

export default settingsSlice.reducer;