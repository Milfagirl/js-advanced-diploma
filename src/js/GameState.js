// объект, который хранит текущее состояние игры (может сам себя воссоздавать из другого объекта)
export default class GameState {
  constructor() {
    this.lastindex = 0; // позиция последнего выбранного персонажа
    this.state = false; // true - персонаж выбран
    this.character = {}; // персонажа из массив allPositions
  }

  get from() {
    return this.lastindex;
    // геттер, срабатывает при чтении obj.propName
  }

  set from(value) {
    this.lastindex = value;
    // сеттер, срабатывает при записи obj.propName = value
  }

  get in() {
    return this.state;
    // геттер, срабатывает при чтении obj.propName
  }

  set in(value) {
    this.state = value;
    // сеттер, срабатывает при записи obj.propName = value
  }

  get setcharacter() {
    return this.character;
    // геттер, срабатывает при чтении obj.propName
  }

  set setcharacter(value) {
    this.character = value;
    // сеттер, срабатывает при записи obj.propName = value
  }
}
export const gamestate = new GameState();
