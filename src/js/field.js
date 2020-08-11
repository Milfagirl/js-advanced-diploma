// размер поля 8X8;
// Двумерные массивы
const size = 8;
class Field {
  constructor() {
    this.right = [];
    this.left = [];
    this.up = [];
    this.down = [];
    this.rightup = [];
    this.rightdown = [];
    // this.leftup = [];
    // this.leftdown = [];
    this.setfield(size);
  }

  setfield(value) {
    for (let i = 0; i < value; i++) {
      const arrright = [];
      for (let j = 0; j < value; j++) {
        arrright.push(value * i + j);
      }
      this.right.push(arrright);
    }

    for (let i = 0; i < value; i++) {
      const arrright = [];
      for (let j = value - 1; j >= 0; j = j- 1) {
        arrright.push(value * i + j);
      }
      this.left.push(arrright);
    }

    for (let i = 0; i < value; i++) {
      const arrright = [];
      for (let j = 0; j < value; j++) {
        arrright.push(value * j + i);
      }
      this.down.push(arrright);
    }
    for (let i = 0; i < value; i++) {
      const arrright = [];
      for (let j = value - 1; j >= 0; j = j- 1) {
        arrright.push(value * j + i);
      }
      this.up.push(arrright);
    }
    for (let i = 1; i < value; i++) { // ниже центральной диагонали
      const arrright = []; 
      for (let j = 0; j <= i; j++) {
        arrright.push(this.up[j][i - j]); // из массива снизу-вверх this.up
      }
      this.rightdown.push(arrright);
    }
    for (let i = 1; i < value - 1; i++) { // выше центральной диагонали
      const arrright = [];
      for (let j = 0; j < value - i; j++) {
        arrright.push(this.down[i + j][j]); // из массива сверху-вниз this.down
      }
      this.rightdown.push(arrright);
    }

    for (let i = 1; i < value; i++) { // выше центральной диагонали
      const arrright = [];
      for (let j = 0; j <= i; j++) {
        arrright.push(this.right[i - j][j]); // из массива слева - направо this.right
      }
      this.rightup.push(arrright);
    }
    for (let i = 1; i < value - 1; i++) { // ниже центральной диагонали
      const arrright = [];
      for (let j = 0; j <= value - i - 1; j++) {
        arrright.push(this.right[value - 1 - j][j + i]); // из массива слева - направо this.right
      }
      this.rightup.push(arrright);
    }
  }
}
const field = new Field();
export default field;
