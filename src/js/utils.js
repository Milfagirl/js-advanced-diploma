/* eslint-disable prefer-destructuring */
export function calcTileType(index, boardSize) {
  // TODO: write logic here
  const array = ['top-left','top-right','top','bottom-left','bottom-right','bottom','right','left','center'];
  let position;

  if (index === 0) {
    position = array[0];
  }
  if (index === boardSize - 1) {
    position = array[1];
  }
  if (index === boardSize ** 2 - 1 - (boardSize - 1)) {
    position = array[3];
  }
  if (index > 0 && index < boardSize - 1) {
    position = array[2];
  }
  if (index === boardSize ** 2 - 1) {
    position = array[4];
  }

  if (index === boardSize - 1) {
    position = array[1];
  }
  if (index > (boardSize ** 2 - 1 - (boardSize - 1)) && index < boardSize ** 2 - 1) {
    position = array[5];
  }
  for (let i = 1; i < boardSize - 1; i++) {
    if (index === boardSize * i) {
      position = array[7];
    }
  }
  for (let i = 2; i < boardSize; i++) {
    if (index === (boardSize * i - 1)) {
      position = array[6];
    }
  }
  for (let i = 1; i < boardSize - 1; i++) {
    if ((index > boardSize * i) && (index < boardSize * i + boardSize - 1)) {
      position = array[8];
    }
  }
  return position;
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
