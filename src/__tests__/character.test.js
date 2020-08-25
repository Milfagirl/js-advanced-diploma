import Character from '../js/Character.js'

test('init new Character', () => {;
  let character;
  expect(character = new Character(1)).toThrow('Character should not called with new');
}