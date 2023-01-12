// import Grid from './grid.js';
import { HORIZONTAL, VERTICAL, findPosition } from './gridUtil';

describe('grid', () => {
  test('find positions randomly when grid is empty', () => {
    const grid = Array(4).fill(null).map(()=>Array(4).fill(null));
    const word = 'test';

    const actual = findPosition(word, grid, null);
    expect(actual.word).toBe(word);
    expect(actual.row).toBeLessThanOrEqual(3);
    expect(actual.column).toBeLessThanOrEqual(3);
    expect([HORIZONTAL, VERTICAL]).toContain(actual.direction);
  });

  test(`can't find position if grid is full`, () => {
    const grid = Array(2).fill(null).map(()=>Array(2).fill('q'));
    const word = 'ab';

    const actual = findPosition(word, grid, null);
    expect(actual).toBeNull();
  });

  test(`finds position of only empty slot`, () => {
    const grid = Array(1).fill(null).map(()=>Array(4).fill(null));
    const word = 'test';

    const actual = findPosition(word, grid, null);
    expect(actual.word).toBe(word);
    expect(actual.row).toBe(0);
    expect(actual.column).toBe(0);
    expect(actual.direction).toBe(HORIZONTAL);
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
    expect(actual.word).toBe(word);
    expect(actual.row).toBeLessThanOrEqual(3);
    expect(actual.column).toBe(0);
    expect(actual.direction).toBe(HORIZONTAL);
  });
});

