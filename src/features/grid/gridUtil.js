//DIRECTIONS
export const VERTICAL = 'V';
export const HORIZONTAL = 'H';
export const DIAGONAL = 'D';

//ORDER
export const FORWARDS = 'F';
export const BACKWARDS = 'B';

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 1) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function isWordAllowed(grid, word, row, column, direction) {
  for(let i = 0; i < word.length; i++) {
    if(direction === VERTICAL) {
      if(grid[row+i][column] !== null && grid[row+i][column] !== word[i]) {
        return false;
      }
    }
    else if(direction === HORIZONTAL) {
      if(grid[row][column+i] !== null && grid[row][column+i] !== word[i]) {
        return false;
      }
    }
    else if(direction === DIAGONAL) {
      if(grid[row+i][column+i] !== null && grid[row+i][column+i] !== word[i]) {
        return false;
      }
    }
  }

  return true;
}

function getDirectionQueue(lastDirectionPlaced, diagonal=false) {
  const queue = [HORIZONTAL, VERTICAL];
  if(diagonal) {
    queue.push(DIAGONAL);
  }
  const shuffledQueue = shuffle(queue);

  if(shuffledQueue[0] === lastDirectionPlaced) {
    shuffledQueue.push(shuffledQueue.shift());
  }
  return shuffledQueue;

  // if(lastDirectionPlaced === VERTICAL) {
  //   return [HORIZONTAL, VERTICAL];
  // }
  // else if(lastDirectionPlaced === HORIZONTAL || Math.random() > 0.5) {
  //   return [VERTICAL, HORIZONTAL];
  // }
  // else {
  //   return [HORIZONTAL, VERTICAL];
  // }
}

export function findPosition(word, grid, lastDirectionPlaced, diagonal=false) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directionQueue = getDirectionQueue(lastDirectionPlaced, diagonal);

  if(word.length > rows && word.length > cols) {
    console.log('Word too large');
    return null;
  }
  while(directionQueue.length > 0) {
    const direction = directionQueue.shift();
    if(direction === VERTICAL) {
      if(word.length <= rows) {
        // console.log('Direction Vertical');
        const columnQueue = shuffle([...Array(cols).keys()]);
        while(columnQueue.length > 0) {
          const column = columnQueue.shift();
          const rowQueue = shuffle([...Array(rows - word.length + 1).keys()]);
          while(rowQueue.length > 0) {
            const row = rowQueue.shift();
            if(isWordAllowed(grid, word, row, column, direction)) {
              return {
                word: word,
                row: row,
                column: column,
                direction: direction
              }
            }
          }
        }
      }
    }
    else if(direction === HORIZONTAL) {
      if(word.length <= cols) {
        // console.log('Direction Horizontal');
        const rowQueue = shuffle([...Array(rows).keys()]);
        while(rowQueue.length > 0) {
          const row = rowQueue.shift();
          const columnQueue = shuffle([...Array(cols - word.length + 1).keys()]);
          while(columnQueue.length > 0) {
            const column = columnQueue.shift();
            if(isWordAllowed(grid, word, row, column, direction)) {
              return {
                word: word,
                row: row,
                column: column,
                direction: direction
              }
            }
          }
        }
      }
    }
    else if(direction === DIAGONAL) {
      if(word.length <= rows && word.length <= cols) {
        // console.log('Direction Diagonal');
        const rowQueue = shuffle([...Array(rows - word.length + 1).keys()]);
        while(rowQueue.length > 0) {
          const row = rowQueue.shift();
          const columnQueue = shuffle([...Array(cols - word.length + 1).keys()]);
          while(columnQueue.length > 0) {
            const column = columnQueue.shift();
            if(isWordAllowed(grid, word, row, column, direction)) {
              return {
                word: word,
                row: row,
                column: column,
                direction: direction
              }
            }
          }
        }
      }
    }
  }
  
  return null;
}