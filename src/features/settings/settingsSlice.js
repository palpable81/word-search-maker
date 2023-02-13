import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayAnimation: true
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    toggleAnimation: (state) => {
      state.displayAnimation = !state.displayAnimation;
    },
  }
});

export const { toggleAnimation } = settingsSlice.actions;

export const selectDisplayAnimation = (state) => state.settings.displayAnimation;

export default settingsSlice.reducer;