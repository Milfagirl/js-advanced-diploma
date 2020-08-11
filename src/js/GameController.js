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
import GamePlay from './GamePlay.js';
import cursors from './cursors.js';
import field from './field.js';
import team from './Team.js';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    this.gamePlay.redrawPositions(team.takecharacter); // отрисовка персонажей на игровом поле
    this.gamePlay.addCellEnterListener(this.onCellEnter); // событие - наведение курсора мыши
    this.gamePlay.addCellClickListener(this.onCellClick); // событие - клик курсора мыши
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    console.log(team.takecharacter);
    console.log(field);
  }

  onCellClick(index) {
    const cell = document.querySelectorAll('.cell');
    const character = cell.item(index).childNodes; // вложения (наличие персонажа)
    gamestate.in = false; // персонаж не выбран
    this.gamePlay.deselectCell(gamestate.from);
    if (character.length > 0) {
      team.takecharacter.forEach((item) => {
        if (item.position === index) {
          if (team.takecharacter.indexOf(item) === 2 || team.takecharacter.indexOf(item) === 3) {
            GamePlay.showError('Выбирайте персонажа из своей команды!');
          } else {
            this.gamePlay.selectCell(index); // выделение выбранного персонажа
            gamestate.from = index; // номер ячейки выбранного персонажа
            gamestate.in = true; // персонаж выбран
            console.log(gamestate);
          }
        }
      });
    }
  }
  // TODO: react to click

  onCellEnter(index) {
    const cell = document.querySelectorAll('.cell');
    const character = cell.item(index).childNodes;
    this.gamePlay.setCursor(cursors.auto);
    if (character.length > 0) {
      team.takecharacter.forEach((item) => {
        if (item.position === index) {
          if (gamestate.in) {
            this.gamePlay.setCursor(cursors.pointer);
          }
          this.gamePlay.showCellTooltip(`${String.fromCharCode(0xD83C, 0xDF96)}${item.character.level}${String.fromCharCode(0x2694)}${item.character.attack}${String.fromCharCode(0xD83D, 0xDEE1)}${item.character.defence}${String.fromCharCode(0x2764)}${item.character.health}`, index);
        }
      });
    }

    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    gamestate.in = false;
    console.log(gamestate);
    // TODO: react to mouse leave
  }
}
