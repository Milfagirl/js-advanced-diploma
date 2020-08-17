// базовый класс, от которого вы будете наследоваться и реализовывать специализированных персонажей
export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 20;
    this.type = type;
    // TODO: throw error if user use "new Character()"
    if (!new.target) {
      return new Error('Character should not called with new');
    }
  }
}
