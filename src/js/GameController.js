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
    this.gamePlay.drawUi(themes.prairie); // отрисовка поля
    this.gamePlay.redrawPositions(team.getAllPositions); // отрисовка персонажей на игровом поле
    this.gamePlay.addCellEnterListener(this.onCellEnter); // событие - наведение курсора мыши
    this.gamePlay.addCellClickListener(this.onCellClick); // событие - клик курсора мыши
    gamestate.getState = false;
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    console.log(team.getAllPositions);
    console.log(field);
  }

  onCellClick(index) { // событик клик
    const cell = document.querySelectorAll('.cell');
    const character = cell.item(index).childNodes; // вложения (наличие персонажа)
    gamestate.getState = false; // персонаж не выбран
    this.gamePlay.deselectCell(gamestate.getLastindex);
    this.gamePlay.deselectCell(gamestate.lastcell);
    if (character.length > 0) {
      team.getAllPositions.forEach((item) => {
        if (item.position === index) {
          if (team.getAllPositions.indexOf(item) === 2 || team.getAllPositions.indexOf(item) === 3) {
            GamePlay.showError('Выбирайте персонажа из своей команды!');
          } else {
            this.gamePlay.selectCell(index); // выделение выбранного персонажа
            this.gamePlay.setCursor(cursors.pointer);
            gamestate.getLastindex = index; // номер ячейки выбранного персонажа
            gamestate.getState = true; // персонаж выбран
            gamestate.getCharacter = item;
            console.log(gamestate);
          }
        }
      });
    }
  }
  // TODO: react to click

  onCellEnter(index) { // событие наведение курсора мыши
    const cell = document.querySelectorAll('.cell');
    const character = cell.item(index).childNodes;
    console.log(gamestate.getLastindex)
    console.log(gamestate.getLastcell)
    this.gamePlay.setCursor(cursors.auto);
    this.gamePlay.deselectCell(gamestate.getLastcell);
    if (gamestate.getState && index !== gamestate.getLastindex) { // если персонаж выбран
      const aroundleave = field.radius('leave', gamestate.getCharacter);
      // this.gamePlay.deselectCell(gamestate.getLastcell);
      aroundleave.forEach((element) => {
        if (element === index) {
          this.gamePlay.setCursor(cursors.pointer);
          this.gamePlay.selectCell(index, 'green');
          gamestate.getLastcell = index;
        }
      });
      if (character.length > 0) {
        const aroundattack = field.radius('attack', gamestate.getCharacter);
        team.getAllPositions.forEach((item) => {
          if (item.position === index && (item.position !== 1 || 2)) {
          // курсор находится на игроке команды 2
            aroundattack.forEach((element) => {
              if (index === element) {
                this.gamePlay.selectCell(index, 'red');
                gamestate.getLastcell = index;
              }
            });
          } else {
            this.gamePlay.setCursor(cursors.notallowed);
            // this.gamePlay.deselectCell(gamestate.lastcell);
            this.gamePlay.onclick = () => GamePlay.showError('Персонаж для атаки не доступен');
          }
        });
      }
    } else { // персонаж не выбран
      team.getAllPositions.forEach((item) => {
        if (item.position === index) {
          this.gamePlay.setCursor(cursors.pointer);
          this.gamePlay.showCellTooltip(`${String.fromCharCode(0xD83C, 0xDF96)}${item.character.level}${String.fromCharCode(0x2694)}${item.character.attack}${String.fromCharCode(0xD83D, 0xDEE1)}${item.character.defence}${String.fromCharCode(0x2764)}${item.character.health}`, index);
        }
      });
    }
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    gamestate.getState = false;
    gamestate.getCharacter = {};
    console.log(gamestate);
    // TODO: react to mouse leave
  }
}
