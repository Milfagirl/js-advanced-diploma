// класс для команды (набор персонажей), представляющих компьютер и игрока
import Bowman from './childrens/Bowman.js';
import Daemon from './childrens/Daemon.js';
import Magician from './childrens/Magician.js';
import Swordsman from './childrens/Swordsman.js';
import Undead from './childrens/Undead.js';
import Vampire from './childrens/Vampire.js';
import generateTeam from './generators.js';
import PositionedCharacter from './PositionedCharacter.js';

export class Team {
  constructor() {
    this.allPositions = [];
    this.takeTeam();
  }

  get getAllPositions() {
    return this.allPositions;
    // геттер, срабатывает при чтении obj.propName
  }

  set getAllPositions(value) {
    this.allPositions = value;
    // сеттер, срабатывает при записи obj.propName = value
  }

  takeTeam() {
    let random = 0;
    let lastrandom = 0;
    const types1 = [Bowman, Magician, Swordsman];
    const types2 = [Daemon, Undead, Vampire];
    const team1 = generateTeam(types1, 4, 2, 1); // персонажи для команды 1
    const positions1 = []; // массив персонажей команды 1 с указанием позиции
    const stay1 = [];
    for (let i = 0; i < 8; i++) {
      stay1.push(i * 8, i * 8 + 1);
    }
    team1.forEach((item) => {
      random = stay1[Math.floor(Math.random() * stay1.length)];
      if (random !== lastrandom) {
        positions1.push(new PositionedCharacter(item, random));
      } else {
        random = stay1[Math.floor(Math.random() * stay1.length)];
        positions1.push(new PositionedCharacter(item, random));
      }
      lastrandom = random;
    });
    const team2 = generateTeam(types2, 4, 2, 2); // персонажи для команды 2
    const positions2 = []; // массив персонажей команды 2 с указанием позиции
    const stay2 = [];
    for (let i = 0; i < 8; i++) {
      stay2.push(i * 8 + 6, i * 8 + 7);
    }
    team2.forEach((item) => {
      random = stay2[Math.floor(Math.random() * stay2.length)];
      if (random !== lastrandom) {
        positions1.push(new PositionedCharacter(item, random));
      } else {
        random = stay2[Math.floor(Math.random() * stay2.length)];
        positions1.push(new PositionedCharacter(item, random));
      }
      lastrandom = random;
    });
    this.getAllPositions = positions1.concat(positions2);
    console.log(this.getAllPositions);
  }

  changePositions(lastValue, newValue) {
    const array = this.getAllPositions;
    for (let i = 0; i < array.length; i++) {
      if (array[i].position === lastValue) {
        array[i].position = newValue;
      }
    }
    this.getAllPositions = array;
    return this.getAllPositions;
  }

  changeHealth(health, position) {
    const array = this.getAllPositions;
    for (let i = 0; i < array.length; i++) {
      if (array[i].position === position) {
        array[i].character.health = health;
      }
    }
    this.getAllPositions = array;
    return this.getAllPositions;
  }
}
const team = new Team();
export default team;