//TO-DO see if a better way to do this, are letters necessary?
export const VERTICAL = 'V';
export const HORIZONTAL = 'H';

export function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 1) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function isWordAllowed(grid, word, row, column, direction) {
  for(let i = 0; i < word.length; i++) {
    if(direction === VERTICAL) {
      // console.log(`Testing ${grid[row+i][column]} vs. ${word[i]} at ${row+i}, ${column}`);
      if(grid[row+i][column] !== null && grid[row+i][column] !== word[i]) {
        return false;
      }
    }
    else {
      // console.log(`Testing ${grid[row][column+i]} vs. ${word[i]} at ${row}, ${column+i}`);
      if(grid[row][column+i] !== null && grid[row][column+i] !== word[i]) {
        return false;
      }
    }
  }

  return true;
}

export function getDirectionQueue(lastDirectionPlaced) {
  if(lastDirectionPlaced === VERTICAL) {
    return [HORIZONTAL, VERTICAL];
  }
  else if(lastDirectionPlaced === HORIZONTAL) {
    return [VERTICAL, HORIZONTAL];
  }
  else if(Math.random() > 0.5) {
    return [HORIZONTAL, VERTICAL];
  }
  else {
    return [VERTICAL, HORIZONTAL];
  }
}

export default class Grid {
  
  constructor(rows = 10, cols = 10) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array(rows).fill(null).map(()=>Array(cols).fill('q'));
    this.words = [];
    this.directionQueue = [];
  }

  get(row, col) {
    return this.grid[row][col];
  }

  set(row, col, value) {
    this.grid[row][col] = value;
  }

  print() {
    let gridToPrint = '';
    this.grid.forEach(row => {
      let rowToPrint = '';
      row.forEach(char => {
        rowToPrint += char || '~';
      })
      gridToPrint += rowToPrint + '\n';
    });
    console.log(gridToPrint);
  }

  #shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 1) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  #isWordAllowed(word, row, column, direction) {
    for(let i = 0; i < word.length; i++) {
      if(direction === VERTICAL) {
        // console.log(`Testing ${grid[row+i][column]} vs. ${word[i]} at ${row+i}, ${column}`);
        if(this.grid[row+i][column] !== null && this.grid[row+i][column] !== word[i]) {
          return false;
        }
      }
      else {
        // console.log(`Testing ${grid[row][column+i]} vs. ${word[i]} at ${row}, ${column+i}`);
        if(this.grid[row][column+i] !== null && this.grid[row][column+i] !== word[i]) {
          return false;
        }
      }
    }
  
    return true;
  }

  #addWord(word, row, column, direction) {
    for(let i = 0; i < word.length; i++) {
      if(direction === VERTICAL) {
        // console.log(`Adding ${word[i]} at ${row+i}, ${column}`);
        this.grid[row+i][column] = word[i];
      }
      else {
        // console.log(`Adding ${word[i]} at ${row}, ${column+i}`);
        this.grid[row][column+i] = word[i];
      }
    }
    this.words.push(word);
  }

  #fillDirectionQueue() {
    if(this.directionQueue.length === 0) {
      if(Math.random() > 0.5) {
        this.directionQueue.unshift(VERTICAL);
      }
      else {
        this.directionQueue.unshift(HORIZONTAL);
      }
    }
    if(this.directionQueue[0] === VERTICAL) {
      this.directionQueue.unshift(HORIZONTAL);
    }
    else {
      this.directionQueue.unshift(VERTICAL);
    }
  }

  placeWord (word) {
    this.#fillDirectionQueue();

    if(word.length > this.rows && word.length > this.cols) {
      return false;
    }
    let isPlaced = false;
    while(this.directionQueue.length > 0 && !isPlaced) {
      const direction = this.directionQueue.shift();
      if(direction === VERTICAL) {
        if(word.length <= this.rows) {
          // console.log('Direction Vertical');
          const columnQueue = this.#shuffle([...Array(this.cols).keys()]);
          while(columnQueue.length > 0 && !isPlaced) {
            const column = columnQueue.shift();
            const rowQueue = this.#shuffle([...Array(this.rows - word.length + 1).keys()]);
            while(rowQueue.length > 0 && !isPlaced) {
              const row = rowQueue.shift();
              if(this.#isWordAllowed(word, row, column, direction)) {
                this.#addWord(word, row, column, direction);
                isPlaced = true;
                this.#fillDirectionQueue();
              }
            }
          }
        }
      }
      else {
        if(word.length <= this.cols) {
          // console.log('Direction Horizontal');
          const rowQueue = this.#shuffle([...Array(this.rows).keys()]);
          while(rowQueue.length > 0 && !isPlaced) {
            const row = rowQueue.shift();
            const columnQueue = this.#shuffle([...Array(this.cols - word.length + 1).keys()]);
            while(columnQueue.length > 0 && !isPlaced) {
              const column = columnQueue.shift();
              if(this.#isWordAllowed(word, row, column, direction)) {
                this.#addWord(word, row, column, direction);
                isPlaced = true;
                this.#fillDirectionQueue();
              }
            }
          }
        }
      }
    }
    
    return isPlaced;
  }
}