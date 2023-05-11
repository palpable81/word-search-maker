// import Grid from './grid.js';
import { Direction, Order, Grid, WordPosition, findPosition } from './gridUtil';

describe('grid', () => {
  test('find positions randomly when grid is empty', () => {
    const grid: Grid = Array(4).fill(null).map(()=>Array(4).fill(null));
    const word = 'test';

    const actual: WordPosition | null = findPosition(word, grid);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBeLessThanOrEqual(3);
      expect(actual.column).toBeLessThanOrEqual(3);
      expect([Direction.HORIZONTAL, Direction.VERTICAL]).toContain(actual.direction);
    }
  });

  test(`can't find position if grid is full`, () => {
    const grid: Grid = Array(2).fill(null).map(()=>Array(2).fill('q'));
    const word = 'ab';

    const actual: WordPosition | null = findPosition(word, grid);
    expect(actual).toBeNull();
  });

  test(`finds position of only empty slot`, () => {
    const grid: Grid = Array(4).fill(null).map(()=>Array(4).fill('q'));
    grid[0][0] = null;
    grid[0][1] = null;
    grid[0][2] = null;
    grid[0][3] = null;
    const word = 'test';

    const actual: WordPosition | null = findPosition(word, grid);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(0);
      expect(actual.column).toBe(0);
      expect(actual.direction).toBe(Direction.HORIZONTAL);
    }
  });

  test(`doesn't find position for word that exceeds dimensions of grid`, () => {
    const grid: Grid = Array(2).fill(null).map(()=>Array(2).fill(null));
    const word = 'test';

    const actual: WordPosition | null = findPosition(word, grid);
    expect(actual).toBeNull();
  });

  test(`finds position horizontally if last placed was vertical`, () => {
    const grid: Grid = Array(4).fill(null).map(()=>Array(4).fill(null));
    const word = 'test';

    const actual: WordPosition | null = findPosition(word, grid, Direction.VERTICAL);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBeLessThanOrEqual(3);
      expect(actual.column).toBe(0);
      expect(actual.direction).toBe(Direction.HORIZONTAL);
    }
  });

  test(`finds position diagonally`, () => {
    const grid: Grid = Array(2).fill(null).map(()=>Array(2).fill('c'));
    grid[0][0] = 'a';
    grid[1][1] = 'b';
    const word = 'ab';

    const actual: WordPosition | null = findPosition(word, grid, undefined, true);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(0);
      expect(actual.column).toBe(0);
      expect(actual.direction).toBe(Direction.DIAGONAL);
    }
  });

  test(`finds position backwards horizontally`, () => {
    const grid: Grid = Array(2).fill(null).map(()=>Array(2).fill('c'));
    grid[0][0] = 'b';
    grid[0][1] = 'a';
    const word = 'ab';

    const actual: WordPosition | null = findPosition(word, grid, undefined, false, true);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(0);
      expect(actual.column).toBe(1);
      expect(actual.direction).toBe(Direction.HORIZONTAL);
      expect(actual.horizontalOrder).toBe(Order.BACKWARDS);
    }
  });

  test(`finds position backwards vertically`, () => {
    const grid: Grid = Array(2).fill(null).map(()=>Array(2).fill('c'));
    grid[0][0] = 'b';
    grid[1][0] = 'a';
    const word = 'ab';

    const actual: WordPosition | null = findPosition(word, grid, undefined, false, true);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(1);
      expect(actual.column).toBe(0);
      expect(actual.direction).toBe(Direction.VERTICAL);
      expect(actual.verticalOrder).toBe(Order.BACKWARDS);
    }
  });

  test(`finds position top-right to bottom-left diagonally`, () => {
    const grid: Grid = Array(2).fill(null).map(()=>Array(2).fill('c'));
    grid[1][0] = 'b';
    grid[0][1] = 'a';
    const word = 'ab';

    const actual: WordPosition | null = findPosition(word, grid, undefined, true, true);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(0);
      expect(actual.column).toBe(1);
      expect(actual.direction).toBe(Direction.DIAGONAL);
      expect(actual.horizontalOrder).toBe(Order.BACKWARDS);
      expect(actual.verticalOrder).toBe(Order.FORWARDS);
    }
  });

  test(`finds position bottom-right to top-left diagonally`, () => {
    const grid: Grid = Array(2).fill(null).map(()=>Array(2).fill('c'));
    grid[0][0] = 'b';
    grid[1][1] = 'a';
    const word = 'ab';

    const actual: WordPosition | null = findPosition(word, grid, undefined, true, true);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(1);
      expect(actual.column).toBe(1);
      expect(actual.direction).toBe(Direction.DIAGONAL);
      expect(actual.horizontalOrder).toBe(Order.BACKWARDS);
      expect(actual.verticalOrder).toBe(Order.BACKWARDS);
    }
  });

});

