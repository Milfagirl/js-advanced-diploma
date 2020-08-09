import Character from '../Character.js';

export default class Daemon extends Character {
  constructor(...args) {
    super(...args);
    this.attack = 10;
    this.defence = 40;
    this.type = 'daemon';
  }
}
