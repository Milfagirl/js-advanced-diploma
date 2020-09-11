/* eslint-disable eol-last *//* eslint-disable semi *//* eslint-disable linebreak-style */
import Character from '../js/Character.js';
import Bowman from '../js/childrens/Bowman.js'

test('init new Character', () => {
  expect(() => new Character(1)).toThrow();
})

test('init new Bowman', () => {
  const bowman = new Bowman();
  const expected = {
    attack: 25,
    defence: 25,
    health: 100,
    level: undefined,
    type: 'bowman',
  }
  expect(bowman).toEqual(expected);
})