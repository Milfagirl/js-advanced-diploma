// класс, отвечающий за логику приложения

import themes from './themes.js';
import Bowman from './childrens/Bowman.js';
import Daemon from './childrens/Daemon.js';
import Magician from './childrens/Magician.js';
import Swordsman from './childrens/Swordsman.js';
import Undead from './childrens/Undead.js';
import Vampire from './childrens/Vampire.js';
import generateTeam from './generators.js';
import PositionedCharacter from './PositionedCharacter.js';
import { gamestate } from './GameState.js';


export default class GameController {
  
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.allPositions = [];
  }

  get takecharacter() {
    return this.allPositions;
    // геттер, срабатывает при чтении obj.propName
  }

  set takecharacter(value) {
    this.allPositions = value;
    // сеттер, срабатывает при записи obj.propName = value
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    const types = [Bowman, Daemon, Magician, Swordsman, Undead, Vampire];
    const team1 = generateTeam(types, 4, 2); // персонажи для команды 1
    const positions1 = []; // массив персонажей команды 1 с указанием позиции
    const stay1 = [];
    for (let i = 0; i < 8; i++) {
      stay1.push(i * 8, i * 8 + 1);
    }
    team1.forEach((item) => {
      positions1.push(new PositionedCharacter(item, stay1[Math.floor(Math.random() * stay1.length)]));
    });
    const team2 = generateTeam(types, 4, 2); // персонажи для команды 2
    const positions2 = []; // массив персонажей команды 2 с указанием позиции
    const stay2 = [];
    for (let i = 0; i < 8; i++) {
      stay2.push(i * 8 + 6, i * 8 + 7);
    }
    team2.forEach((item) => {
      positions2.push(new PositionedCharacter(item, stay2[Math.floor(Math.random() * stay2.length)]));
    });
    this.takecharacter = positions1.concat(positions2);
    this.gamePlay.redrawPositions(this.allPositions); // отрисовка персонажей на игровом поле
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellClickListener(this.onCellClick);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    console.log(this.allPositions);
  }

  onCellClick(index) {
    const cell = document.querySelectorAll('.cell');
    const character = cell.item(index).childNodes;
    console.log(this.gamePlay);
    console.log(gamestate.from);
    this.gamePlay.deselectCell(gamestate.from);
    if (character.length > 0) {
      this.allPositions.forEach((item) => {
        if (item.position === index) {
          this.gamePlay.selectCell(index);
          gamestate.from = index;
          console.log(gamestate.from);
        }
      });
    }
  }
  // TODO: react to click

  onCellEnter(index) {
    const cell = document.querySelectorAll('.cell');
    const character = cell.item(index).childNodes;
    if (character.length > 0) {
      console.log(this.allPositions);
      console.log(this.gamePlay);
      console.log(index);
      this.allPositions.forEach((item) => {
        if (item.position === index) {
          this.gamePlay.showCellTooltip(`${String.fromCharCode(0xD83C, 0xDF96)}${item.character.level}${String.fromCharCode(0x2694)}${item.character.attack}${String.fromCharCode(0xD83D, 0xDEE1)}${item.character.defence}${String.fromCharCode(0x2764)}${item.character.health}`, index);
        }
      });
    }

    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    // TODO: react to mouse leave
  }
}
