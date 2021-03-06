// Character, привязанный к координате на поле.
// Обратите внимание, что несмотря на то, что поле выглядит как двумерный массив,
// внутри оно хранится как одномерный
//  (считайте это своеобразным legacy, с которым вам придётся бороться)

import Character from './Character.js';

export default class PositionedCharacter {
  constructor(character, position) {
    if (!(character instanceof Character)) {
      throw new Error('character must be instance of Character or its children');
    }

    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }

    this.character = character;
    this.position = position;
  }
}
