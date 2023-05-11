import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setDiagonal: (state, action) => {
      state.allowDiagonal = action.payload;
    },
    setBackwards: (state, action) => {
      state.allowBackwards = action.payload;
    },
  }
});

export const { toggleAnimation, setDiagonal, setBackwards } = settingsSlice.actions;

export const selectDisplayAnimation = (state: any) => state.settings.displayAnimation;
export const selectAllowDiagonal = (state: any) => state.settings.allowDiagonal;
export const selectAllowBackwards = (state: any) => state.settings.allowBackwards;

export default settingsSlice.reducer;