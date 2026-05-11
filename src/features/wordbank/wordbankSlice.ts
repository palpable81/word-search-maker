import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Word = {
  id: number,
  word: string, 
  triedToPlace: boolean | null, 
  placedSuccessfully: boolean | null
}

export interface WordbankState {
  wordbank: Word[];
};

const initialState = {
  wordbank: new Array(10).fill({
    word: '', 
    triedToPlace: false, 
    placedSuccessfully: null})
  .map((entry, i) => ({...entry, id: i})),
};

const wordbankSlice = createSlice({
  name: 'wordbank',
  initialState: initialState,
  reducers: {
    setWord: (state, action: PayloadAction<Word>) => {
      state.wordbank[action.payload.id].word = action.payload.word;
      state.wordbank[action.payload.id].triedToPlace = false;
      state.wordbank[action.payload.id].placedSuccessfully = null;
    },
    setWordStatus: (state, action: PayloadAction<Word>) => {
      state.wordbank[action.payload.id].triedToPlace = action.payload.triedToPlace;
      state.wordbank[action.payload.id].placedSuccessfully = action.payload.placedSuccessfully;
    },
    truncateWords: (state, action: PayloadAction<number>) => {
      const maxLen = action.payload;
      state.wordbank = state.wordbank.map(entry => {
        let nonSpaceCount = 0;
        for (const ch of entry.word) {
          if (ch !== ' ') nonSpaceCount++;
        }
        if (nonSpaceCount <= maxLen) return entry;
        let result = '';
        let count = 0;
        for (const ch of entry.word) {
          result += ch;
          if (ch !== ' ') count++;
          if (count >= maxLen) break;
        }
        return { ...entry, word: result, triedToPlace: false, placedSuccessfully: null };
      });
    }
  }
});

export const { setWord, setWordStatus, truncateWords } = wordbankSlice.actions;

export const selectWordbank = (state: RootState) => state.wordbank.wordbank;

export default wordbankSlice.reducer;