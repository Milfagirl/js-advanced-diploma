/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
// класс для команды (набор персонажей), представляющих компьютер и игрока
// import Bowman from './childrens/Bowman.js';
// import Daemon from './childrens/Daemon.js';
// import Magician from './childrens/Magician.js';
// import Swordsman from './childrens/Swordsman.js';
// import Undead from './childrens/Undead.js';
// import Vampire from './childrens/Vampire.js';
import generateTeam from './generators.js';
import PositionedCharacter from './PositionedCharacter.js';
import { gamestate } from './GameState.js';
// eslint-disable-next-line no-unused-vars
import gameCtrl, { stateService } from './app.js';
// eslint-disable-next-line no-unused-vars
import GameStateService from './GameStateService.js';

export class Team {
  constructor() {
    this.allPositions = [];
    this.takeTeam(1, 1, 2, 2); // maxLevel1, maxLevel2, characterCount1, characterCount2
    // this.team = [];
  }

  get getAllPositions() {
    return this.allPositions;
    // геттер, срабатывает при чтении obj.propName
  }

  set getAllPositions(value) {
    this.allPositions = value;
    // сеттер, срабатывает при записи obj.propName = value
  }

  get getTeam() {
    return this.team;
    // геттер, срабатывает при чтении obj.propName
  }

  set getTeam(value) {
    this.team = value;
    // сеттер, срабатывает при записи obj.propName = value
  }

  takeTeam(maxLevel1, maxLevel2, characterCount1, characterCount2) {
    const saved = stateService.load();
    if (!saved || !saved.stateonload) {
      let random = 0;
      const arrayofrandom = [];
      const team1 = generateTeam(gamestate.getTypes1, maxLevel1, characterCount1, 1); // персонажи для команды 1 (allowedTypes, maxLevel, characterCount, team)
      const positions1 = []; // массив персонажей команды 1 с указанием позиции
      const stay1 = [];
      for (let i = 0; i < 8; i++) {
        stay1.push(i * 8, i * 8 + 1);
      }
      team1.forEach((item) => {
        random = stay1[Math.floor(Math.random() * stay1.length)];
        while (arrayofrandom.indexOf(random) >= 0) {
          random = stay1[Math.floor(Math.random() * stay1.length)];
        }
        arrayofrandom.push(random);
        positions1.push(new PositionedCharacter(item, random));
      });
      const team2 = generateTeam(gamestate.getTypes2, maxLevel2, characterCount2, 2); // персонажи для команды 2
      const positions2 = []; // массив персонажей команды 2 с указанием позиции
      const stay2 = [];
      for (let i = 0; i < 8; i++) {
        stay2.push(i * 8 + 6, i * 8 + 7);
      }
      team2.forEach((item) => {
        random = stay2[Math.floor(Math.random() * stay2.length)];
        while (arrayofrandom.indexOf(random) >= 0) {
          random = stay2[Math.floor(Math.random() * stay2.length)];
        }
        arrayofrandom.push(random);
        positions2.push(new PositionedCharacter(item, random));
      });
      this.getAllPositions = positions1.concat(positions2, this.getAllPositions);
    } else this.getAllPositions = saved.stateteam;
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

// const team = new Team();
// export default team;
