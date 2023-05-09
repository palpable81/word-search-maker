import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wordbank: new Array(10).fill({
    word: '', 
    triedToPlace: false, 
    placedSuccessfully: null}),
};

const wordbankSlice = createSlice({
  name: 'wordbank',
  initialState: initialState,
  reducers: {
    setWord: (state, action) => {
      state.wordbank[action.payload.id].word = action.payload.word;
      state.wordbank[action.payload.id].triedToPlace = false;
      state.wordbank[action.payload.id].placedSuccessfully = null;
    },
    setWordStatus: (state, action) => {
      state.wordbank[action.payload.id].triedToPlace = action.payload.triedToPlace;
      state.wordbank[action.payload.id].placedSuccessfully = action.payload.placedSuccessfully;
    }
  }
});

export const { setWord, setWordStatus } = wordbankSlice.actions;

export const selectWordbank = (state: any) => state.wordbank.wordbank;

export default wordbankSlice.reducer;