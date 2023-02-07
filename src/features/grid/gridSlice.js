import { createSlice } from '@reduxjs/toolkit';
import { VERTICAL, findPosition } from './gridUtil';

export const ROWS = 10;
export const COLS = 10;
const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const initialState = {
  grid: Array(ROWS).fill(null).map(()=>Array(COLS).fill(null)),
  words: [],
  lastDirectionPlaced: null,
  finished: false
};

const gridSlice = createSlice({
  name: 'grid',
  initialState: initialState,
  reducers: {
    setGrid: (state, action) => {
      state.grid = action.payload;
    },
    addWord: (state, action) => {
      const {word, row, column, direction} = action.payload;
      for(let i = 0; i < word.length; i++) {
        if(direction === VERTICAL) {
          state.grid[row+i][column] = word[i];
        }
        else {
          state.grid[row][column+i] = word[i];
        }
      }
      state.words = state.words.concat(word);
      state.lastDirectionPlaced = direction;
    },
    fillRemainingSquares: (state) => {
      const grid = state.grid;
      for(let row = 0; row < grid.length; row++) {
        for(let column = 0; column < grid[0].length; column++) {
          if(grid[row][column] === null) {
            grid[row][column] = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
          }
        }
      }
      state.finished = true;
    },
    clearGrid: (state) => {
      state.grid = Array(ROWS).fill(null).map(()=>Array(COLS).fill(null));
      state.words = [];
      state.finished = false;
    },
  }
});

export const { setGrid, addWord, fillRemainingSquares, clearGrid } = gridSlice.actions;
export const selectGrid = (state) => state.grid.grid;
export const selectFinished = (state) => state.grid.finished;

// Redux Thunk to place word
export const placeWord = (word) =>  (dispatch, getState) => {
  const { grid, lastDirectionPlaced } = getState().grid;
  const position = findPosition(word, grid, lastDirectionPlaced);

  if(position) {
    dispatch(addWord(position));
    return true;
  }
  return false;
};

export default gridSlice.reducer;