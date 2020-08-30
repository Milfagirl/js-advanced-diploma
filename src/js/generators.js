/**
 * Generates random characters
 * Генерация персонажей
 * @param allowedTypes iterable of classes Массив классов
 * @param maxLevel max character level Максимальный level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel, team) {
  const rand = Math.floor(Math.random() * allowedTypes.length);
  const SomeCharacter = allowedTypes[rand];
  const someCharacter = new SomeCharacter(maxLevel);
  someCharacter.level = maxLevel;
  someCharacter.team = team;
  yield someCharacter;
  // TODO: write logic here
}

export default function generateTeam(allowedTypes, maxLevel, characterCount, team) {
  const arrayOfCharacter = [];
  for (let i = 0; i < characterCount; i++) {
    const generator = characterGenerator(allowedTypes, maxLevel, team);
    arrayOfCharacter[i] = (generator.next().value);
  }
  return arrayOfCharacter;
}
