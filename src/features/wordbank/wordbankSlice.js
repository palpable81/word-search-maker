import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wordbank: new Array(10).fill(''),
};

const wordbankSlice = createSlice({
  name: 'wordbank',
  initialState: initialState,
  reducers: {
    setWord: (state, action) => {
      state.wordbank[action.payload.id] = action.payload.word;
    },
  }
});

export const { setWord } = wordbankSlice.actions;

export const selectWordbank = (state) => state.wordbank.wordbank;

export default wordbankSlice.reducer;