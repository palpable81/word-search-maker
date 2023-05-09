// import Grid from './grid.js';
import { HORIZONTAL, VERTICAL, DIAGONAL, FORWARDS, BACKWARDS, findPosition } from './gridUtil';

describe('grid', () => {
  test('find positions randomly when grid is empty', () => {
    const grid = Array(4).fill(null).map(()=>Array(4).fill(null));
    const word = 'test';

    const actual = findPosition(word, grid, null);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBeLessThanOrEqual(3);
      expect(actual.column).toBeLessThanOrEqual(3);
      expect([HORIZONTAL, VERTICAL]).toContain(actual.direction);
    }
  });

  test(`can't find position if grid is full`, () => {
    const grid = Array(2).fill(null).map(()=>Array(2).fill('q'));
    const word = 'ab';

    const actual = findPosition(word, grid, null);
    expect(actual).toBeNull();
  });

  test(`finds position of only empty slot`, () => {
    const grid = Array(4).fill(null).map(()=>Array(4).fill('q'));
    grid[0][0] = null;
    grid[0][1] = null;
    grid[0][2] = null;
    grid[0][3] = null;
    const word = 'test';

    const actual = findPosition(word, grid, null);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(0);
      expect(actual.column).toBe(0);
      expect(actual.direction).toBe(HORIZONTAL);
    }
  });

  test(`doesn't find position for word that exceeds dimensions of grid`, () => {
    const grid = Array(2).fill(null).map(()=>Array(2).fill(null));
    const word = 'test';

    const actual = findPosition(word, grid, null);
    expect(actual).toBeNull();
  });

  test(`finds position horizontally if last placed was vertical`, () => {
    const grid = Array(4).fill(null).map(()=>Array(4).fill(null));
    const word = 'test';

    const actual = findPosition(word, grid, VERTICAL);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBeLessThanOrEqual(3);
      expect(actual.column).toBe(0);
      expect(actual.direction).toBe(HORIZONTAL);
    }
  });

  test(`finds position diagonally`, () => {
    const grid = Array(2).fill(null).map(()=>Array(2).fill('c'));
    grid[0][0] = 'a';
    grid[1][1] = 'b';
    const word = 'ab';

    const actual = findPosition(word, grid, null, true);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(0);
      expect(actual.column).toBe(0);
      expect(actual.direction).toBe(DIAGONAL);
    }
  });

  test(`finds position backwards horizontally`, () => {
    const grid = Array(2).fill(null).map(()=>Array(2).fill('c'));
    grid[0][0] = 'b';
    grid[0][1] = 'a';
    const word = 'ab';

    const actual = findPosition(word, grid, null, false, true);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(0);
      expect(actual.column).toBe(1);
      expect(actual.direction).toBe(HORIZONTAL);
      expect(actual.horizontalOrder).toBe(BACKWARDS);
    }
  });

  test(`finds position backwards vertically`, () => {
    const grid = Array(2).fill(null).map(()=>Array(2).fill('c'));
    grid[0][0] = 'b';
    grid[1][0] = 'a';
    const word = 'ab';

    const actual = findPosition(word, grid, null, false, true);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(1);
      expect(actual.column).toBe(0);
      expect(actual.direction).toBe(VERTICAL);
      expect(actual.verticalOrder).toBe(BACKWARDS);
    }
  });

  test(`finds position top-right to bottom-left diagonally`, () => {
    const grid = Array(2).fill(null).map(()=>Array(2).fill('c'));
    grid[1][0] = 'b';
    grid[0][1] = 'a';
    const word = 'ab';

    const actual = findPosition(word, grid, null, true, true);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(0);
      expect(actual.column).toBe(1);
      expect(actual.direction).toBe(DIAGONAL);
      expect(actual.horizontalOrder).toBe(BACKWARDS);
      expect(actual.verticalOrder).toBe(FORWARDS);
    }
  });

  test(`finds position bottom-right to top-left diagonally`, () => {
    const grid = Array(2).fill(null).map(()=>Array(2).fill('c'));
    grid[0][0] = 'b';
    grid[1][1] = 'a';
    const word = 'ab';

    const actual = findPosition(word, grid, null, true, true);
    expect(actual).not.toBeNull();
    if(actual) {
      expect(actual.word).toBe(word);
      expect(actual.row).toBe(1);
      expect(actual.column).toBe(1);
      expect(actual.direction).toBe(DIAGONAL);
      expect(actual.horizontalOrder).toBe(BACKWARDS);
      expect(actual.verticalOrder).toBe(BACKWARDS);
    }
  });

});

