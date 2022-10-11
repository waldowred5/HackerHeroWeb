import { atom } from 'recoil';
import { GAME_SCREEN } from 'utils/constants';

export const gameScreenState = atom({
  key: 'gameScreen',
  default: GAME_SCREEN.MAIN_MENU,
});
