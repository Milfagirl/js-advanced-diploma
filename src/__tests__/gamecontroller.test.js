test('showCellToolTip', () => {
  const expected = '🎖level⚔attack🛡defence❤health';

  const received = `${String.fromCharCode(0xD83C, 0xDF96)}level${String.fromCharCode(0x2694)}attack${String.fromCharCode(0xD83D, 0xDEE1)}defence${String.fromCharCode(0x2764)}health`;
  expect(received).toBe(expected);
});
