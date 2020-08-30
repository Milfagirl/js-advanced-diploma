/* eslint-disable import/no-cycle */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-useless-return */
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
// класс, отвечающий за логику приложения

import themes from './themes.js';
import { gamestate } from './GameState.js';
// eslint-disable-next-line import/no-cycle
import GamePlay from './GamePlay.js';
import cursors from './cursors.js';
import field from './field.js';
import { Team } from './Team.js';
// import GameStateService from './GameStateService.js';

let team;

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    team = new Team();
    gamestate.getLevel = 1;
    gamestate.getGlasses = 0;
    const saved = this.stateService.load();
    if (saved && gamestate.getOnLoad) {
      gamestate.getLevel = saved.statelevel;
      gamestate.getMove = saved.statemove
      gamestate.getLastindex = saved.statelastindex;
      gamestate.getLastCell = saved.statelastcell;
      gamestate.getOnSave = false;
      gamestate.getOnLoad = false;
      gamestate.getGameStateTeam = saved.stateteam;
      gamestate.getGlasses = saved.stateglasses;
      team.getAllPositions = saved.stateteam;
    } else {
      gamestate.getMove = 1;
      gamestate.getGameStateTeam = team.getAllPositions;
    }
    this.gamePlay.drawUi(themes[gamestate.getLevel - 1]); // отрисовка поля
    this.gamePlay.redrawPositions(team.getAllPositions); // отрисовка персонажей на игровом поле
    this.gamePlay.addCellEnterListener(this.onCellEnter); // событие - наведение курсора мыши
    this.gamePlay.addCellClickListener(this.onCellClick); // событие - клик курсора мыши
    this.gamePlay.addNewGameListener(this.onNewGameClick);
    this.gamePlay.addSaveGameListener(this.onSaveGameClick);
    this.gamePlay.addLoadGameListener(this.onLoadGameClick);
    gamestate.getState = false; // персонаж не выбран
    // gamestate.getMove = 1; // очередь команды 1
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) { // событик клик
    let team1 = 0;
    let team2 = 0;

    const newteam = team.getAllPositions;
    newteam.forEach((element) => {
      if (element.character.team === 1) {
        team1++;
      }
      if (element.character.team === 2) {
        team2++;
      }
    });
    if (team1 > 0 && team2 > 0) {
      if (gamestate.getMove === 1) {
        const cell = document.querySelectorAll('.cell');
        const character = cell.item(index).childNodes; // вложения (наличие персонажа)
        this.gamePlay.deselectCell(gamestate.getLastindex);
        this.gamePlay.deselectCell(gamestate.getLastcell);
        if (character.length > 0) {
          if (!gamestate.getState) { // если персонаж не выбран
            team.getAllPositions.forEach((item) => {
              if (item.position === index) {
                if (item.character.team === 2) {
                  GamePlay.showError('Выбирайте персонажа из своей команды!');
                }
                this.gamePlay.selectCell(index); // выделение выбранного персонажа
                this.gamePlay.setCursor(cursors.pointer);
                gamestate.getLastindex = index; // номер ячейки выбранного персонажа
                gamestate.getState = true; // персонаж выбран
                gamestate.getCharacter = item;
              }
            });
          } else { // если персонаж уже выбран
            team.getAllPositions.forEach((item) => {
              if (item.position === index) {
                if (item.character.team === 1) {
                  this.gamePlay.selectCell(index); // выделение выбранного персонажа
                  gamestate.getLastindex = index; // номер ячейки выбранного персонажа
                  gamestate.getState = true; // персонаж выбран
                  gamestate.getCharacter = item;
                }

                if (item.character.team === 2) {
                  let purpose = 0
                  gamestate.getTarget = item;
                  const attack = gamestate.getCharacter.character.attack;
                  const defence = gamestate.getTarget.character.defence;
                  const damage = Math.max(attack - defence, attack * 0.1);
                  const showdamage = this.gamePlay.showDamage(index, damage);
                  purpose++;
                  if (purpose > 0) {
                    showdamage.then(() => {
                      const promise = new Promise((resolve) => {
                        gamestate.getTarget.character.health -= damage;
                        if (gamestate.getTarget.character.health <= 0) {
                          gamestate.getTarget.character.health = 0;
                          team.getAllPositions.splice(team.getAllPositions.indexOf(gamestate.getTarget), 1);
                          this.gamePlay.redrawPositions(team.getAllPositions);
                          gamestate.getGameStateTeam = team.getAllPositions;
                        } else {
                          this.gamePlay.redrawPositions(team.changeHealth(gamestate.getTarget.character.health, index));
                          gamestate.getGameStateTeam = team.getAllPositions;
                        }
                        this.onCellEnter(index);
                        gamestate.getLastcell = index;
                        resolve();
                        return promise;
                      }).then(() => {
                        this.gamePlay.deselectCell(gamestate.getLastcell);
                        gamestate.getMove = 2;
                        setTimeout(() => {
                          this.onSecondTeam();
                        }, 500);
                      });
                    });
                  }
                }
              }
            });
          }
        } else if (gamestate.getState) {
          new Promise((resolve) => {
            const aroundleave = field.radius('leave', gamestate.getCharacter);
            aroundleave.forEach((element) => {
              if (element === index) {
                this.gamePlay.redrawPositions(team.changePositions(gamestate.getLastindex, index));
                gamestate.getGameStateTeam = team.getAllPositions;
                gamestate.getLastindex = index; // номер ячейки выбранного персонажа
                gamestate.getState = true; // персонаж выбран
                this.gamePlay.selectCell(index);
              }
            });
            resolve();
          }).then(() => {
            gamestate.getMove = 2;
            setTimeout(() => {
              this.onSecondTeam();
            }, 500);
          });
        }
      }
    } else if (team1 > 0 && team2 === 0) {
      if (gamestate.getLevel <= 4) {
        team.getAllPositions.forEach((item) => {
          if (item.character.team === 1) {
            gamestate.getGlasses += item.character.health
          }
        });
        GamePlay.showMessage(`Переход на уровень ${gamestate.getLevel + 1}. Количество набранных очков ${gamestate.getGlasses}`);
        this.levelUp();
        this.gamePlay.redrawPositions(team.getAllPositions);
        gamestate.getGameStateTeam = team.getAllPositions;
        this.gamePlay.addCellEnterListener(this.onCellEnter); // событие - наведение курсора мыши
        this.gamePlay.addCellClickListener(this.onCellClick); // событие - клик курсора мыши
        gamestate.getState = false; // персонаж не выбран
        gamestate.getMove = 1; // очередь команды 1
        gamestate.getLastCell = null;
        this.onCellEnter(index);
      } else {
        GamePlay.showMessage('Победа!');
        // return;
      }
    } else if (team1 === 0) {
      GamePlay.showMessage('Игра окончена!');
      // eslint-disable-next-line no-useless-return
      // return;
    }
  }

  // TODO: react to click

  onCellEnter(index) { // событие наведение курсора мыши TODO: react to mouse enter
    const cell = document.querySelectorAll('.cell');
    const character = cell.item(index).childNodes; // index содержит элемент
    if (gamestate.getMove === 1) { // если очередь команды 1
      this.gamePlay.setCursor(cursors.auto);
      if (gamestate.getLastcell !== gamestate.getLastindex) {
        this.gamePlay.deselectCell(gamestate.getLastcell);
      }
      if (gamestate.getState && index !== gamestate.getLastindex) { // если персонаж выбран
        const aroundleave = field.radius('leave', gamestate.getCharacter); // радиус перемещения выбранного персонажа
        if (character.length === 0) {
          aroundleave.forEach((element) => {
            if (element === index) {
              this.gamePlay.setCursor(cursors.pointer);
              this.gamePlay.selectCell(index, 'green');
            }
          });
        }
        if (character.length > 0) { // персонаж есть в клетке
          const aroundattack = field.radius('attack', gamestate.getCharacter); // радиус атаки выбранного персонажа
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
              // gamestate.getLastcell = index;
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
      // gamestate.getLastcell = index;
    }
    gamestate.getLastcell = index;
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    gamestate.getState = false;
    gamestate.getCharacter = {};
    // TODO: react to mouse leave
  }

  onSecondTeam() {
    let team1 = 0;
    let team2 = 0;
    team.getAllPositions.forEach((element) => {
      if (element.character.team === 1) {
        team1++;
      }
      if (element.character.team === 2) {
        team2++;
      }
    });

    if (team1 > 0 && team2 > 0) {
      const array = [];
      team.getAllPositions.forEach((element) => {
        if (element.character.team === 2) {
          array.push(team.getAllPositions.indexOf(element));
        }
      });
      const random = array[Math.floor(Math.random() * array.length)]; // случайный индекс массива positioncharacter выбор между игроками 2 команды
      const cell = document.querySelectorAll('.cell');
      const character = team.getAllPositions[random]; //
      const aroundattack = field.radius('attack', character); // радиус атаки для выбранного персонажа команды 2
      aroundattack.forEach((element) => {
        if (cell.item(element).childNodes.length > 0) { // в радиусе атаки есть персонажи команды 2
        // радиус атаки содержит персонаж команды 1
          team.getAllPositions.forEach((item) => {
            if (item.position === element) {
              if (item.character.team === 1 && gamestate.getMove === 2) {
                gamestate.getTarget = item;
                const damage = Math.max(gamestate.getCharacter.character.attack - gamestate.getTarget.character.defence, gamestate.getCharacter.character.attack * 0.1);
                const showdamage = this.gamePlay.showDamage(gamestate.getTarget.position, damage);
                showdamage.then(() => {
                  gamestate.getTarget.character.health -= damage;
                  if (gamestate.getTarget.character.health <= 0) {
                    gamestate.getTarget.character.health = 0;
                    team.getAllPositions.splice(team.getAllPositions.indexOf(gamestate.getTarget), 1);
                    this.gamePlay.redrawPositions(team.getAllPositions);
                    gamestate.getGameStateTeam = team.getAllPositions;
                    this.gamePlay.deselectCell(gamestate.getTarget.position);
                  } else {
                    team.getAllPositions = team.changeHealth(gamestate.getTarget.character.health, gamestate.getTarget.position);
                    gamestate.getGameStateTeam = team.getAllPositions;
                  }
                });
                gamestate.getstate = false;
                gamestate.getMove = 1;
              }
            }
          });
        }
      });
      if (gamestate.getMove === 2) {
        const arrayleave = Array.from(field.radius('leave', character));
        let celltoleave;
        const arrayofteam1position = [];

        team.getAllPositions.forEach((element) => { // позиции персонажей
          arrayofteam1position.push(element.position);
        });
        celltoleave = arrayleave[Math.floor(Math.random() * arrayleave.length)];
        while (arrayofteam1position.indexOf(celltoleave) >= 0) { // пока рандомный выбор совпадает с позицией персонажей (занят)
          celltoleave = arrayleave[Math.floor(Math.random() * arrayleave.length)];
        }
        this.gamePlay.redrawPositions(team.changePositions(character.position, celltoleave));
        gamestate.getGameStateTeam = team.getAllPositions;
        gamestate.getState = false; // персонаж не выбран
        // this.gamePlay.deselectCell(gamestate.getLastindex);
        gamestate.getMove = 1;
      }
    } else if (team1 === 0) {
      GamePlay.showMessage('Игра окончена!');
      // eslint-disable-next-line no-useless-return
      return;
    }
  }

  levelUp() {
    const lastlevel = gamestate.getLevel;
    gamestate.getLevel = lastlevel + 1;
    team.getAllPositions.forEach((item) => {
      const lasthealth = item.character.getHealth;
      item.character.getHealth = lasthealth + 20;
      if (item.character.getHealth >= 20) {
        item.character.getHealth = 20;
      }
      const attackAfter = Math.max(item.character.getAttack, item.character.getAttack * ((180 - item.character.getHealth) / 100));
      item.character.getAttack = attackAfter;
      if (item.character.team === 1) {
        item.character.getCharacterLevel++;
      }
    });
    this.gamePlay.drawUi(themes[gamestate.getLevel - 1]);
    let count; // количество выживших игроков команды 1
    switch (gamestate.getLevel) {
      case 2:
        count = 0; // количество выживших игроков команды 1
        team.getAllPositions.forEach((item) => {
          if (item.character.team === 1) {
            count++;
          }
        });
        team.takeTeam(1, Math.floor(1 + Math.random() * 2), 1, count + 1);
        gamestate.getGameStateTeam = team.getAllPositions;
        break;
      case 3:
        count = 0; // количество выживших игроков команды 1
        team.getAllPositions.forEach((item) => {
          if (item.character.team === 1) {
            count++;
          }
        });
        team.takeTeam(Math.floor(1 + Math.random() * 2), Math.floor(1 + Math.random() * 3), 2, count + 2);
        gamestate.getGameStateTeam = team.getAllPositions;
        break;
      case 4:
        count = 0; // количество выживших игроков команды 1
        team.getAllPositions.forEach((item) => {
          if (item.character.team === 1) {
            count++;
          }
        });
        team.takeTeam(Math.floor(1 + Math.random() * 3), Math.floor(1 + Math.random() * 4), 2, count + 2);
        gamestate.getGameStateTeam = team.getAllPositions;
        break;
    }
  }

  onNewGameClick() {
    const lastIndex = gamestate.getLastindex;
    const lastCell = gamestate.getLastcell;
    gamestate.getOnSave = false;
    gamestate.getOnLoad = false;
    gamestate.getLevel = 1;
    this.stateService.save(gamestate.getStateForSaveGame(gamestate));
    this.init()
    gamestate.getLastindex = lastIndex;
    gamestate.getLastcell = lastCell;
  }

  onSaveGameClick() {
    gamestate.getGameStateTeam = team.getAllPositions;
    gamestate.getOnSave = true;
    this.stateService.save(gamestate.getStateForSaveGame(gamestate));
  }

  onLoadGameClick() {
    const saved = this.stateService.load();
    if (saved && saved.stateonsave) {
      gamestate.getOnLoad = true;
    }
    this.init()
  }
}