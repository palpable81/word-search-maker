import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

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

export const selectDisplayAnimation = (state: RootState) => state.settings.displayAnimation;
export const selectAllowDiagonal = (state: RootState) => state.settings.allowDiagonal;
export const selectAllowBackwards = (state: RootState) => state.settings.allowBackwards;

export default settingsSlice.reducer;