import { calcTileType } from '../js/utils.js';

test('utils function calcTileType should return string', () => {
  const array = ['top-left', 'top-right', 'top', 'bottom-left', 'bottom-right', 'bottom', 'right', 'left', 'center'];
  const boardSize = 8;
  expect(calcTileType(0, boardSize)).toBe(array[0]);
  expect(calcTileType(boardSize - 1, boardSize)).toBe(array[1]);
  expect(calcTileType(boardSize ** 2 - 1 - (boardSize - 1), boardSize)).toBe(array[3]);
  for (let index = 1; index < boardSize - 1; index++) {
    expect(calcTileType(index, boardSize)).toBe(array[2]);
  }
  expect(calcTileType(boardSize ** 2 - 1, boardSize)).toBe(array[4]);
  expect(calcTileType(boardSize - 1, boardSize)).toBe(array[1]);
  for (let index = boardSize ** 2 - (boardSize - 1); index < boardSize ** 2 - 1; index++) {
    expect(calcTileType(index, boardSize)).toBe(array[5]);
  }

  for (let i = 1; i < boardSize - 1; i++) {
    expect(calcTileType(boardSize * i, boardSize)).toBe(array[7]);
  }
  for (let i = 2; i < boardSize; i++) {
    expect(calcTileType(boardSize * i - 1, boardSize)).toBe(array[6]);
  }
  for (let i = 1; i < boardSize - 1; i++) {
    for (let index = boardSize * i + 1; index < boardSize * i + boardSize - 1; index++) {
      expect(calcTileType(index, boardSize)).toBe(array[8]);
    }
  }
});
