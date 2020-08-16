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
import GameState, { gamestate } from './GameState.js';
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
  }

  onCellClick(index) { // событик клик
    const cell = document.querySelectorAll('.cell');
    const character = cell.item(index).childNodes; // вложения (наличие персонажа)
    this.gamePlay.deselectCell(gamestate.getLastindex);
    this.gamePlay.deselectCell(gamestate.lastcell);
    if (character.length > 0) {
      if (!gamestate.getState) { // если персонаж не выбран
        team.getAllPositions.forEach((item) => {
          if (item.position === index) {
            if (item.character === 2) {
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
        // team.getAllPositions.indexOf(item) === 0 || team.getAllPositions.indexOf(item) === 1)
      } else { // если персонаж уже выбран
        team.getAllPositions.forEach((item) => {
          if (item.position === index) {
            if (item.character.team === 1) {
              this.gamePlay.selectCell(index); // выделение выбранного персонажа
              //this.gamePlay.setCursor(cursors.pointer);
              gamestate.getLastindex = index; // номер ячейки выбранного персонажа
              gamestate.getState = true; // персонаж выбран
              gamestate.getCharacter = item;
              console.log(gamestate);
            }

            if (item.character.team === 2) {
              gamestate.getTarget = item;
              const damage = Math.max(gamestate.getCharacter.character.attack - gamestate.getTarget.character.defence, gamestate.getCharacter.character.attack * 0.1);
              const showdamage = this.gamePlay.showDamage(index, damage);
              showdamage.then(() => {
                gamestate.getTarget.character.health -= damage;
                if (gamestate.getTarget.character.health < 0) {
                  gamestate.getTarget.character.health = 0;
                }
                this.gamePlay.redrawPositions(team.changeHealth(gamestate.getTarget.character.health, index));

                this.onCellEnter(index);
                console.log(team);
              });
              console.log(team.getAllPositions);
            }
          }
        });
      }
    } else if (gamestate.getState) {
      const aroundleave = field.radius('leave', gamestate.getCharacter);
      aroundleave.forEach((element) => {
        if (element === index) {
          this.gamePlay.redrawPositions(team.changePositions(gamestate.getLastindex, index));
          gamestate.getLastindex = index; // номер ячейки выбранного персонажа
          gamestate.getState = true; // персонаж выбран
          this.gamePlay.selectCell(index);
        }
      });
    }
  }

  // TODO: react to click

  onCellEnter(index) { // событие наведение курсора мыши
    const cell = document.querySelectorAll('.cell');
    const character = cell.item(index).childNodes;
    this.gamePlay.setCursor(cursors.auto);
    if (gamestate.getLastcell !== gamestate.getLastindex) {
      this.gamePlay.deselectCell(gamestate.getLastcell);
    }
    // this.gamePlay.deselectCell(gamestate.getLastcell);
    if (gamestate.getState && index !== gamestate.getLastindex) { // если персонаж выбран
      const aroundleave = field.radius('leave', gamestate.getCharacter);
      // this.gamePlay.deselectCell(gamestate.getLastcell);
      if (character.length === 0) {
        aroundleave.forEach((element) => {
          if (element === index) {
            this.gamePlay.setCursor(cursors.pointer);
            this.gamePlay.selectCell(index, 'green');
            gamestate.getLastcell = index;
          }
        });
      } if (character.length > 0) { // персонаж есть в клетке
        const aroundattack = field.radius('attack', gamestate.getCharacter);
        this.gamePlay.setCursor(cursors.notallowed);
        aroundattack.forEach((element) => {
          if (index === element) { // радиус атаки позволяет атаковать
            team.getAllPositions.forEach((item) => {
              if (item.position === index) {
                if (item.character.team === 2) {
                  this.gamePlay.selectCell(index, 'red');
                  this.gamePlay.setCursor(cursors.crosshair);
                }
              }
            });
            gamestate.getLastcell = index;
          }
          if (index !== element) { // персонаж вне допустимого радиуса атаки
            this.gamePlay.onclick = () => GamePlay.showError('Персонаж для атаки не доступен');
          }
        });
      }
    }
    team.getAllPositions.forEach((item) => {
      if (item.position === index) {
        if (item.character.team === 1) {
          this.gamePlay.setCursor(cursors.pointer);
        }
        this.gamePlay.showCellTooltip(`${String.fromCharCode(0xD83C, 0xDF96)}${item.character.level}${String.fromCharCode(0x2694)}${item.character.attack}${String.fromCharCode(0xD83D, 0xDEE1)}${item.character.defence}${String.fromCharCode(0x2764)}${item.character.health}`, index);
      }
    });
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    gamestate.getState = false;
    gamestate.getCharacter = {};
    // TODO: react to mouse leave
  }
}
