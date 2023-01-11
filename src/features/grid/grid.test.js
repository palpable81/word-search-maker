import Grid from './grid.js';

describe('grid', () => {
  test('places a word randomly when empty', () => {
    const grid = new Grid();
    const word = 'test';

    grid.placeWord(word);
    expect(grid.words).toContain(word);
    grid.print();
  });

  test(`can't place word after grid is full`, () => {
    const grid = new Grid(2, 2);
    const word1 = 'ab';
    const word2 = 'cd';
    const word3 = 'ef';

    grid.placeWord(word1);
    grid.placeWord(word2);
    grid.placeWord(word3);
    expect(grid.words).toContain(word1);
    expect(grid.words).toContain(word2);
    expect(grid.words).not.toContain(word3);
    grid.print();
  });

  test(`places word in only empty slot`, () => {
    const grid = new Grid(1, 4);
    const word = 'test';

    grid.placeWord(word);
    expect(grid.words).toContain(word);
    grid.print();
  });

  test(`doesn't place word that exceeds dimensions of grid`, () => {
    const grid = new Grid(2, 2);
    const word = 'test';

    grid.placeWord(word);
    expect(grid.words).not.toContain(word);
    grid.print();

  });

  test('places a bunch of words', () => {
    const grid = new Grid();
    const wordlist = ['skateboard','ambulance','submarine','excavator','airplane','bicycle','rocket','truck','ship','boat','car','bus'];

    while(wordlist.length > 0) {
      const word = wordlist.shift();
      grid.placeWord(word);
    }

    grid.print();
  });
});

