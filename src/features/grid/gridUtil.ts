export enum Direction {
  VERTICAL,
  HORIZONTAL,
  DIAGONAL
}

export enum Order {
  FORWARDS,
  BACKWARDS
}

export type WordPosition = {
  word: string,
  row: number,
  column: number,
  direction: Direction,
  horizontalOrder: Order,
  verticalOrder: Order
}

export type Grid = (string | null)[][];

function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 1) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function isWordAllowed(grid: Grid, position: WordPosition): boolean {
  const {word, row, column, direction, horizontalOrder, verticalOrder} = position;
  const getCellValue = (r: number, c: number) => grid[r] && grid[r][c];

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

function getDirectionQueue(lastDirectionPlaced: Direction, diagonal: boolean=false): Direction[] {
  const queue = [Direction.HORIZONTAL, Direction.VERTICAL];
  if(diagonal) {
    queue.push(Direction.DIAGONAL);
  }
  const shuffledQueue = shuffle<Direction>(queue);

  if(shuffledQueue[0] === lastDirectionPlaced) {
    const nextDirection = shuffledQueue.shift();
    if(nextDirection) {
      shuffledQueue.push(nextDirection);
    }
    
  }
  return shuffledQueue;
}

function getOrderQueue(backwards: boolean=false): Order[] {
  const queue = [Order.FORWARDS];
  if(backwards) {
    queue.push(Order.BACKWARDS);
  }
  const shuffledQueue = shuffle(queue);
  return shuffledQueue;
}

export function findPosition(word: string, grid: Grid, lastDirectionPlaced: Direction=Direction.HORIZONTAL, 
  allowDiagonal: boolean=false, allowBackwards: boolean=false): WordPosition | null {
  const rows = grid.length;
  const cols = grid[0].length;
  const directionQueue = getDirectionQueue(lastDirectionPlaced, allowDiagonal);

  if(word.length > rows && word.length > cols) {
    return null;
  }

  while(directionQueue.length > 0) {
    const direction = directionQueue.shift();

    if(word.length <= rows && word.length <= cols) {
      
      const verticalOrderQueue = getOrderQueue(allowBackwards);

      while(verticalOrderQueue.length > 0) {
        const verticalOrder = verticalOrderQueue.shift();
        let rowQueue = direction === Direction.VERTICAL ? 
          shuffle([...Array(rows - word.length + 1).keys()]) : 
          shuffle([...Array(rows).keys()]);

        if(verticalOrder === Order.BACKWARDS) {
          rowQueue = rowQueue.map((i: number) => i + word.length - 1);
        }

        while(rowQueue.length > 0) {
          const row = rowQueue.shift();
          const horizontalOrderQueue = getOrderQueue(allowBackwards);

          while(horizontalOrderQueue.length > 0) {
            const horizontalOrder = horizontalOrderQueue.shift();
            let columnQueue = direction === Direction.HORIZONTAL ?
              shuffle([...Array(cols - word.length + 1).keys()]) : 
              shuffle([...Array(cols).keys()]);

            if(horizontalOrder === Order.BACKWARDS) {
              columnQueue = columnQueue.map((i: number) => i + word.length - 1);
            }

            while(columnQueue.length > 0) {
              const column = columnQueue.shift();
              if(typeof row === 'number' && typeof column === 'number' && 
                typeof direction === 'number' && typeof horizontalOrder === 'number' && 
                typeof verticalOrder === 'number') {
                const position: WordPosition = {
                  word: word,
                  row: row,
                  column: column,
                  direction: direction,
                  horizontalOrder: horizontalOrder,
                  verticalOrder: verticalOrder
                }
  
                if(isWordAllowed(grid, position)) {
                  return position;
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