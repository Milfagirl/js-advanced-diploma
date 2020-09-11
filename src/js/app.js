/**
 * Entry point of app: don't change this
 */
// eslint-disable-next-line import/no-cycle
import GamePlay from './GamePlay.js';
// eslint-disable-next-line import/no-cycle
import GameController from './GameController.js';
import GameStateService from './GameStateService.js';

export const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

export const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();

// don't write your code here
export default gameCtrl;
