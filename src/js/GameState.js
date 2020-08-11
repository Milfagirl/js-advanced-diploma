// объект, который хранит текущее состояние игры (может сам себя воссоздавать из другого объекта)
export default class GameState {
  constructor() {
    this.lastindex = 0; // позиция последнего выбранного персонажа
    this.state = false; // true - персонаж выбран
    this.person = 0; // номер персонажа из массива allPositions
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

  get personIndex() {
    return this.person;
    // геттер, срабатывает при чтении obj.propName
  }

  set personIndex(value) {
    this.person = value;
    // сеттер, срабатывает при записи obj.propName = value
  }
}
export const gamestate = new GameState();
