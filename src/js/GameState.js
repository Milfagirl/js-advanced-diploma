// объект, который хранит текущее состояние игры (может сам себя воссоздавать из другого объекта)
export default class GameState {
  constructor() {
    this.lastindex = 0;
  }
  
  get from() {
    return this.lastindex;
    // геттер, срабатывает при чтении obj.propName
  }

  set from(value) {
    this.lastindex = value;
    // сеттер, срабатывает при записи obj.propName = value
  }
  // static from(value1, value2) {
  //   const newobject = {
  //     name: value1,
  //     lastindex: value2,
  //   };
  //   // TODO: create object
  //   return newobject;
  // }
}
export const gamestate = new GameState();