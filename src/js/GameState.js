// объект, который хранит текущее состояние игры (может сам себя воссоздавать из другого объекта)
export default class GameState {
  constructor() {
    this.lastindex = 0; // позиция последнего выбранного персонажа
    this.state = ''; // true - персонаж выбран
    this.character = {}; // персонаж из массив allPositions
    this.lastcell = 0; // позиция последней клетки наведения курсора
    this.target = {};
  }

  get getLastcell() {
    return this.lastcell;
  }

  set getLastcell(value) {
    this.lastcell = value;
  }

  get getLastindex() {
    return this.lastindex;
    // геттер, срабатывает при чтении obj.propName
  }

  set getLastindex(value) {
    this.lastindex = value;
    // сеттер, срабатывает при записи obj.propName = value
  }

  get getState() {
    return this.state;
    // геттер, срабатывает при чтении obj.propName
  }

  set getState(value) {
    this.state = value;
    // сеттер, срабатывает при записи obj.propName = value
  }

  get getCharacter() {
    return this.character;
    // геттер, срабатывает при чтении obj.propName
  }

  set getCharacter(value) {
    this.character = value;
    // сеттер, срабатывает при записи obj.propName = value
  }
  get getTarget() {
    return this.target;
    // геттер, срабатывает при чтении obj.propName
  }

  set getTarget(value) {
    this.target = value;
    // сеттер, срабатывает при записи obj.propName = value
  }
}
export const gamestate = new GameState();
