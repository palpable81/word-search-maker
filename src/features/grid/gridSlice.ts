import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Direction, Order, Grid, WordPosition, findPosition } from './gridUtil';

export const ROWS = 10;
export const COLS = 10;
const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export interface GridState {
  grid: Grid,
  words: string[],
  lastDirectionPlaced?: Direction,
  finished: boolean,
  isGenerating: boolean
}

const initialState: GridState = {
  grid: Array(ROWS).fill(null).map(()=>Array(COLS).fill(null)),
  words: [],
  finished: false,
  isGenerating: false
}

const gridSlice = createSlice({
  name: 'grid',
  initialState: initialState,
  reducers: {
    addWord: (state, action: PayloadAction<WordPosition>) => {
      const {word, row, column, direction, horizontalOrder, verticalOrder} = action.payload;

      for (let i = 0; i < word.length; i++) {
        const currentRow = direction !== Direction.HORIZONTAL ? (verticalOrder === Order.FORWARDS ? row + i : row - i) : row;
        const currentColumn = direction !== Direction.VERTICAL ? (horizontalOrder === Order.FORWARDS ? column + i : column - i) : column;
      
        state.grid[currentRow][currentColumn] = word[i];
      }

      state.words = state.words.concat(word);
      state.lastDirectionPlaced = direction;
    },
    fillRemainingSquares: (state) => {
      const grid: Grid = state.grid;
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
    setIsGenerating: (state, action: PayloadAction<boolean>) => {
      state.isGenerating = action.payload;
    }
  }
});

export const { addWord, fillRemainingSquares, clearGrid, setIsGenerating } = gridSlice.actions;
export const selectGrid = (state: any) => state.grid.grid;
export const selectFinished = (state: any) => state.grid.finished;
export const selectIsGenerating = (state: any) => state.grid.isGenerating;

// Redux Thunk to place word
export const placeWord = (word: any) =>  (dispatch: any, getState: any) => {
  const { grid, lastDirectionPlaced } = getState().grid;
  const { allowDiagonal, allowBackwards } = getState().settings;
  const position: WordPosition | null = findPosition(word, grid, lastDirectionPlaced, allowDiagonal, allowBackwards);

  if(position) {
    dispatch(addWord(position));
    return true;
  }
  return false;
};

export default gridSlice.reducer;