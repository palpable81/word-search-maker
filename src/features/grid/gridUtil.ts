//DIRECTIONS
export enum Direction {
  VERTICAL,
  HORIZONTAL,
  DIAGONAL
}
// export const VERTICAL = 'V';
// export const HORIZONTAL = 'H';
// export const DIAGONAL = 'D';

//ORDER
export const FORWARDS = 'F';
export const BACKWARDS = 'B';

function shuffle(array: any) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 1) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function isWordAllowed(grid: any, word: any, row: any, column: any, direction: any, horizontalOrder: any, verticalOrder: any) {
  for(let i = 0; i < word.length; i++) {
    if(direction === Direction.VERTICAL) {
      if(verticalOrder === FORWARDS) {
        if(grid[row+i][column] !== null && grid[row+i][column] !== word[i]) {
          return false;
        }
      }
      else {
        if(grid[row-i][column] !== null && grid[row-i][column] !== word[i]) {
          return false;
        }
      }
    }
    else if(direction === Direction.HORIZONTAL) {
      if(horizontalOrder === FORWARDS) {
        if(grid[row][column+i] !== null && grid[row][column+i] !== word[i]) {
          return false;
        }
      }
      else {
        if(grid[row][column-i] !== null && grid[row][column-i] !== word[i]) {
          return false;
        }
      }
    }
    else if(direction === Direction.DIAGONAL) {
      if(horizontalOrder === FORWARDS && verticalOrder === FORWARDS) {
        if(grid[row+i][column+i] !== null && grid[row+i][column+i] !== word[i]) {
          return false;
        }
      }
      else if(horizontalOrder === FORWARDS && verticalOrder === BACKWARDS) {
        if(grid[row-i][column+i] !== null && grid[row-i][column+i] !== word[i]) {
          return false;
        }
      }
      else if(horizontalOrder === BACKWARDS && verticalOrder === FORWARDS) {
        if(grid[row+i][column-i] !== null && grid[row+i][column-i] !== word[i]) {
          return false;
        }
      }
      else if(horizontalOrder === BACKWARDS && verticalOrder === BACKWARDS) {
        if(grid[row-i][column-i] !== null && grid[row-i][column-i] !== word[i]) {
          return false;
        }
      }
    }
  }

  return true;
}

function getDirectionQueue(lastDirectionPlaced: any, diagonal=false) {
  const queue = [Direction.HORIZONTAL, Direction.VERTICAL];
  if(diagonal) {
    queue.push(Direction.DIAGONAL);
  }
  const shuffledQueue = shuffle(queue);

  if(shuffledQueue[0] === lastDirectionPlaced) {
    shuffledQueue.push(shuffledQueue.shift());
  }
  return shuffledQueue;
}

function getOrderQueue(backwards=false) {
  const queue = [FORWARDS];
  if(backwards) {
    queue.push(BACKWARDS);
  }
  const shuffledQueue = shuffle(queue);
  return shuffledQueue;
}

export function findPosition(word: any, grid: any, lastDirectionPlaced: any, diagonal=false, backwards=false) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directionQueue = getDirectionQueue(lastDirectionPlaced, diagonal);

  if(word.length > rows && word.length > cols) {
    console.log('Word too large');
    return null;
  }
  while(directionQueue.length > 0) {
    const direction = directionQueue.shift();
    if(word.length <= rows && word.length <= cols) {
      // console.log('Direction Diagonal');
      const verticalOrderQueue = getOrderQueue(backwards);
      while(verticalOrderQueue.length > 0) {
        const verticalOrder = verticalOrderQueue.shift();
        let rowQueue = shuffle([...Array(rows - word.length + 1).keys()]);
        if(verticalOrder === BACKWARDS) {
          rowQueue = rowQueue.map((i: any) => i + word.length - 1);
        }
        while(rowQueue.length > 0) {
          const row = rowQueue.shift();
          const horizontalOrderQueue = getOrderQueue(backwards);
          while(horizontalOrderQueue.length > 0) {
            const horizontalOrder = horizontalOrderQueue.shift();
            let columnQueue = shuffle([...Array(cols - word.length + 1).keys()]);
            if(horizontalOrder === BACKWARDS) {
              columnQueue = columnQueue.map((i: any) => i + word.length - 1);
            }
            while(columnQueue.length > 0) {
              const column = columnQueue.shift();
              if(isWordAllowed(grid, word, row, column, direction, horizontalOrder, verticalOrder)) {
                return {
                  word: word,
                  row: row,
                  column: column,
                  direction: direction,
                  horizontalOrder: horizontalOrder,
                  verticalOrder: verticalOrder
                }
              }
            }
          }
        }
      }
    }
  }
  
  return null;
}