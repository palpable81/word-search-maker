export enum Direction {
  VERTICAL,
  HORIZONTAL,
  DIAGONAL
}

export enum Order {
  FORWARDS,
  BACKWARDS
}

export type wordPosition = {
  word: string,
  row: number,
  column: number,
  direction: Direction,
  horizontalOrder: Order,
  verticalOrder: Order
}

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
  const getCellValue = (r: any, c: any) => grid[r] && grid[r][c];

  for (let i = 0; i < word.length; i++) {
    const currentRow = direction !== Direction.HORIZONTAL ? row + (verticalOrder === Order.FORWARDS ? i : -i) : row;
    const currentColumn = direction !== Direction.VERTICAL ? column + (horizontalOrder === Order.FORWARDS ? i : -i) : column;
    
    const cellValue = getCellValue(currentRow, currentColumn);

    if (cellValue !== null && cellValue !== word[i]) {
      return false;
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
  const queue = [Order.FORWARDS];
  if(backwards) {
    queue.push(Order.BACKWARDS);
  }
  const shuffledQueue = shuffle(queue);
  return shuffledQueue;
}

export function findPosition(word: any, grid: any, lastDirectionPlaced: any, diagonal=false, backwards=false): wordPosition | null {
  const rows = grid.length;
  const cols = grid[0].length;
  const directionQueue = getDirectionQueue(lastDirectionPlaced, diagonal);

  if(word.length > rows && word.length > cols) {
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
        if(verticalOrder === Order.BACKWARDS) {
          rowQueue = rowQueue.map((i: any) => i + word.length - 1);
        }
        while(rowQueue.length > 0) {
          const row = rowQueue.shift();
          const horizontalOrderQueue = getOrderQueue(backwards);
          while(horizontalOrderQueue.length > 0) {
            const horizontalOrder = horizontalOrderQueue.shift();
            let columnQueue = shuffle([...Array(cols - word.length + 1).keys()]);
            if(horizontalOrder === Order.BACKWARDS) {
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