/* eslint-disable eol-last */
import Character from '../Character.js';

export default class Magician extends Character {
  constructor(...args) {
    super(...args);
    this.attack = 10;
    this.defence = 40;
    this.type = 'magician';
  }
}