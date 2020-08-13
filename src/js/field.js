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

  radius(method, item) {
    const set = new Set();
    let maxLeavePosition = 0;
    if (method === 'leave') {
      if (item.character.type === 'bowman' || item.character.type === 'vampire') {
        maxLeavePosition = 2;
      }
      if (item.character.type === 'swordsman' || item.character.type === 'undead') {
        maxLeavePosition = 4;
      }
      if (item.character.type === 'magician' || item.character.type === 'daemon') {
        maxLeavePosition = 1;
      }
    }
    if (method === 'attack') {
      if (item.character.type === 'bowman' || item.character.type === 'vampire') {
        maxLeavePosition = 2;
      }
      if (item.character.type === 'swordsman' || item.character.type === 'undead') {
        maxLeavePosition = 1;
      }
      if (item.character.type === 'magician' || item.character.type === 'daemon') {
        maxLeavePosition = 4;
      }
    }
    
    console.log(item.position, maxLeavePosition);
    for (let i = 0; i < this.right.length; i++) {
      for (let j = 0; j < this.right[i].length; j++) {
        if (this.right[i][j] === item.position) {
          let newarray = [];
          if (j - maxLeavePosition <= 0) {
            newarray = this.right[i].slice(0, (j + maxLeavePosition + 1));
          } else if (j + maxLeavePosition > newarray.length) {
            newarray = this.right[i].slice((j - maxLeavePosition), (j + maxLeavePosition));
          } else {
            newarray = this.right[i].slice((j - maxLeavePosition), (j + maxLeavePosition + 1));
          }
          newarray.forEach((element) => {
            set.add(element);
          });
          
        }
      }
    }
    for (let i = 0; i < this.down.length; i++) {
      for (let j = 0; j < this.down[i].length; j++) {
        if (this.down[i][j] === item.position) {
          let newarray = [];
          console.log(this.down[i]);
          if (j - maxLeavePosition <= 0) {
            newarray = this.down[i].slice(0, (j + maxLeavePosition + 1));
          } else if (j + maxLeavePosition > newarray.length) {
            newarray = this.down[i].slice((j - maxLeavePosition), (j + maxLeavePosition));
          } else {
            newarray = this.down[i].slice((j - maxLeavePosition), (j + maxLeavePosition + 1));
          }
          newarray.forEach((element) => {
            set.add(element);
          });
          
          
        }
      }
    }
    for (let i = 0; i < this.rightdown.length; i++) {
      for (let j = 0; j < this.rightdown[i].length; j++) {
        if (this.rightdown[i][j] === item.position) {
          let newarray = [];
          if (j - maxLeavePosition <= 0) {
            newarray = this.rightdown[i].slice(0, (j + maxLeavePosition + 1));
          } else if (j + maxLeavePosition > newarray.length) {
            newarray = this.rightdown[i].slice((j - maxLeavePosition), (j + maxLeavePosition));
          } else {
            newarray = this.rightdown[i].slice((j - maxLeavePosition), (j + maxLeavePosition + 1));
          }
          newarray.forEach((element) => {
            set.add(element);
          });
          
        }
      }
    }
    for (let i = 0; i < this.rightup.length; i++) {
      for (let j = 0; j < this.rightup[i].length; j++) {
        if (this.rightup[i][j] === item.position) {
          let newarray = [];
          if (j - maxLeavePosition <= 0) {
            newarray = this.rightup[i].slice(0, (j + maxLeavePosition + 1));
          } else if (j + maxLeavePosition > newarray.length) {
            newarray = this.rightup[i].slice((j - maxLeavePosition), (j + maxLeavePosition));
          } else {
            newarray = this.rightup[i].slice((j - maxLeavePosition), (j + maxLeavePosition + 1));
          }
          newarray.forEach((element) => {
            set.add(element);
          });
          
        }
      }
    }
    console.log(set);
    return set;
  }
}

const field = new Field();
export default field;
