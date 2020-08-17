// объект, который хранит текущее состояние игры (может сам себя воссоздавать из другого объекта)
export default class GameState {
  constructor() {
    this.lastindex = 0; // позиция последнего выбранного персонажа
    this.state = ''; // true - персонаж выбран
    this.character = {}; // персонаж из массив allPositions
    this.lastcell = 0; // позиция последней клетки наведения курсора
    this.target = {}; // персонаж для атаки из массив allPositions
    this.move = 0; // очередность игры
    this.level = 1;
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
}
export const gamestate = new GameState();
