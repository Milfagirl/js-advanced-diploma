/* eslint-disable eol-last *//* eslint-disable semi *//* eslint-disable linebreak-style */
import Character from '../js/Character.js';

test('init new Character', () => {
  expect(() => new Character(1)).toThrow();
})