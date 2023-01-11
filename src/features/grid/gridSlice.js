import { createSlice } from '@reduxjs/toolkit';
import { HORIZONTAL, VERTICAL, shuffle, isWordAllowed, getDirectionQueue } from './grid';

const initialState = {
  grid: Array(10).fill(null).map(()=>Array(10).fill(null)),
  rows: 10,
  cols: 10,
  words: [],
  lastDirectionPlaced: null
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
    clearWords: (state) => {
      state.words = [];
    },
  }
});

export const { setGrid, addWord, clearWords, setDirectionQueue } = gridSlice.actions;
export const selectGrid = (state) => state.grid.grid;

// Redux Thunk to place word
export const placeWord = (word) =>  (dispatch, getState) => {
  const { grid, rows, cols, lastDirectionPlaced } = getState().grid;
  const directionQueue = getDirectionQueue(lastDirectionPlaced);

  if(word.length > rows && word.length > cols) {
    console.log('Word too large');
    return false;
  }
  let isPlaced = false;
  while(directionQueue.length > 0 && !isPlaced) {
    const direction = directionQueue.shift();
    if(direction === VERTICAL) {
      if(word.length <= rows) {
        console.log('Direction Vertical');
        const columnQueue = shuffle([...Array(cols).keys()]);
        while(columnQueue.length > 0 && !isPlaced) {
          const column = columnQueue.shift();
          const rowQueue = shuffle([...Array(rows - word.length + 1).keys()]);
          while(rowQueue.length > 0 && !isPlaced) {
            const row = rowQueue.shift();
            if(isWordAllowed(grid, word, row, column, direction)) {
              dispatch(addWord({
                word: word,
                row: row,
                column: column,
                direction: direction
              }));
              isPlaced = true;
            }
          }
        }
      }
    }
    else {
      if(word.length <= cols) {
        console.log('Direction Horizontal');
        const rowQueue = shuffle([...Array(rows).keys()]);
        while(rowQueue.length > 0 && !isPlaced) {
          const row = rowQueue.shift();
          const columnQueue = shuffle([...Array(cols - word.length + 1).keys()]);
          while(columnQueue.length > 0 && !isPlaced) {
            const column = columnQueue.shift();
            if(isWordAllowed(grid, word, row, column, direction)) {
              dispatch(addWord({
                word: word,
                row: row,
                column: column,
                direction: direction
              }));
              isPlaced = true;
            }
          }
        }
      }
    }
  }
  
  return true;
};

export default gridSlice.reducer;