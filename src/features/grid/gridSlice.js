import { createSlice } from '@reduxjs/toolkit';
import { VERTICAL, HORIZONTAL, FORWARDS, BACKWARDS, findPosition } from './gridUtil';

export const ROWS = 10;
export const COLS = 10;
const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const initialState = {
  grid: Array(ROWS).fill(null).map(()=>Array(COLS).fill(null)),
  words: [],
  lastDirectionPlaced: null,
  finished: false,
  isGenerating: false
};

const gridSlice = createSlice({
  name: 'grid',
  initialState: initialState,
  reducers: {
    addWord: (state, action) => {
      const {word, row, column, direction, horizontalOrder, verticalOrder} = action.payload;
      for(let i = 0; i < word.length; i++) {
        if(direction === VERTICAL) {
          if(verticalOrder === FORWARDS) {
            state.grid[row+i][column] = word[i];
          }
          else {
            state.grid[row-i][column] = word[i];
          }
        }
        else if(direction === HORIZONTAL){
          if(horizontalOrder === FORWARDS) {
            state.grid[row][column+i] = word[i];
          }
          else {
            state.grid[row][column-i] = word[i];
          }
        }
        else {
          if(verticalOrder === FORWARDS && horizontalOrder === FORWARDS) {
            state.grid[row+i][column+i] = word[i];
          }
          else if(verticalOrder === BACKWARDS && horizontalOrder === FORWARDS) {
            state.grid[row-i][column+i] = word[i];
          }
          else if(verticalOrder === FORWARDS && horizontalOrder === BACKWARDS) {
            state.grid[row+i][column-i] = word[i];
          }
          else {
            state.grid[row-i][column-i] = word[i];
          }
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
    setIsGenerating: (state, action) => {
      state.isGenerating = action.payload;
    }
  }
});

export const { addWord, fillRemainingSquares, clearGrid, setIsGenerating } = gridSlice.actions;
export const selectGrid = (state) => state.grid.grid;
export const selectFinished = (state) => state.grid.finished;
export const selectIsGenerating = (state) => state.grid.isGenerating;

// Redux Thunk to place word
export const placeWord = (word) =>  (dispatch, getState) => {
  const { grid, lastDirectionPlaced } = getState().grid;
  const { diagonal, backwards } = getState().settings;
  const position = findPosition(word, grid, lastDirectionPlaced, diagonal, backwards);

  if(position) {
    dispatch(addWord(position));
    return true;
  }
  return false;
};

export default gridSlice.reducer;