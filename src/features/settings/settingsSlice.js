import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayAnimation: true,
  diagonal: false,
  backwards: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    toggleAnimation: (state) => {
      state.displayAnimation = !state.displayAnimation;
    },
    setDiagonal: (state, action) => {
      state.diagonal = action.payload;
    },
    setBackwards: (state, action) => {
      state.backwards = action.payload;
    },
  }
});

export const { toggleAnimation, setDiagonal, setBackwards } = settingsSlice.actions;

export const selectDisplayAnimation = (state) => state.settings.displayAnimation;
export const selectDiagonal = (state) => state.settings.diagonal;
export const selectBackwards = (state) => state.settings.backwards;

export default settingsSlice.reducer;