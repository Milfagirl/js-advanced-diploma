// базовый класс, от которого вы будете наследоваться и реализовывать специализированных персонажей
export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 100;
    this.type = type;
    // TODO: throw error if user use "new Character()"
    if (new.target.name === 'Character') {
      throw new Error('error new Character');
    }
  }

  get getHealth() {
    return this.health;
    // геттер, срабатывает при чтении obj.propName
  }

  set getHealth(value) {
    this.health = value;
    // сеттер, срабатывает при записи obj.propName = value
  }

  get getAttack() {
    return this.attack;
    // геттер, срабатывает при чтении obj.propName
  }

  set getAttack(value) {
    this.attack = value;
    // сеттер, срабатывает при записи obj.propName = value
  }

  get getCharacterLevel() {
    return this.level;
    // геттер, срабатывает при чтении obj.propName
  }

  set getCharacterLevel(value) {
    this.level = value;
    // сеттер, срабатывает при записи obj.propName = value
  }
}
