/* eslint-disable class-methods-use-this */
// объект, который хранит текущее состояние игры (может сам себя воссоздавать из другого объекта)
import Bowman from './childrens/Bowman.js';
import Daemon from './childrens/Daemon.js';
import Magician from './childrens/Magician.js';
import Swordsman from './childrens/Swordsman.js';
import Undead from './childrens/Undead.js';
import Vampire from './childrens/Vampire.js';

export default class GameState {
  constructor() {
    this.lastindex = 0; // позиция последнего выбранного персонажа
    this.state = ''; // true - персонаж выбран
    this.character = {}; // персонаж из массив allPositions
    this.lastcell = 0; // позиция последней клетки наведения курсора
    this.target = {}; // персонаж для атаки из массив allPositions
    this.move = 1; // очередность игры 1 -первая команда, 2 - вторая команда
    this.level = 1;
    this.types1 = [Bowman, Magician, Swordsman];
    this.types2 = [Daemon, Undead, Vampire];
    this.gamestateteam = [];
    this.onsave = false;
    this.onload = false;
    this.glasses = 0;
  }

  get getOnSave() {
    return this.onsave;
  }

  set getOnSave(value) {
    this.onsave = value;
  }

  get getGlasses() {
    return this.glasses;
  }

  set getGlasses(value) {
    this.glasses = value;
  }

  get getOnLoad() {
    return this.onload;
  }

  set getOnLoad(value) {
    this.onload = value;
  }

  get getGameStateTeam() {
    return this.gamestateteam;
  }

  set getGameStateTeam(value) {
    this.gamestateteam = value;
  }

  get getLastcell() {
    return this.lastcell;
  }

  set getLastcell(value) {
    this.lastcell = value;
  }

  get getLastindex() {
    return this.lastindex;
  }

  set getLastindex(value) {
    this.lastindex = value;
  }

  get getState() {
    return this.state;
  }

  set getState(value) {
    this.state = value;
  }

  get getCharacter() {
    return this.character;
  }

  set getCharacter(value) {
    this.character = value;
  }

  get getTarget() {
    return this.target;
  }

  set getTarget(value) {
    this.target = value;
  }

  get getMove() {
    return this.move;
  }

  set getMove(value) {
    this.move = value;
  }

  get getLevel() {
    return this.level;
  }

  set getLevel(value) {
    this.level = value;
  }

  get getTypes1() {
    return this.types1;
  }

  get getTypes2() {
    return this.types2;
  }

  getStateForSaveGame(state) {
    const lastindex = state.getLastindex;
    const lastcell = state.getLastcell;
    const move = state.getMove;
    const team = state.getGameStateTeam;
    const onsave = state.getOnSave;
    const level = state.getLevel;
    const onload = state.getOnLoad;
    const glasses = state.getGlasses;
    const returnstate = {
      statelastindex: lastindex,
      statelastcell: lastcell,
      statemove: move,
      stateteam: team,
      stateonsave: onsave,
      statelevel: level,
      stateonload: onload,
      stateglasses: glasses,
    };
    console.log(returnstate);
    return returnstate;
  }
}
export const gamestate = new GameState();
