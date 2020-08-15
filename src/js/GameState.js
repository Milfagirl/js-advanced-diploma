// объект, который хранит текущее состояние игры (может сам себя воссоздавать из другого объекта)
export default class GameState {
  constructor() {
    this.lastindex = 0; // позиция последнего выбранного персонажа
    this.state = false; // true - персонаж выбран
    this.character = {}; // персонаж из массив allPositions
    this.lastcell = 0; // позиция последней клетки наведения курсора
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
}
export const gamestate = new GameState();
