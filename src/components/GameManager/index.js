import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { gameScreenState } from './store';
import { Loading } from 'scenes/Loading';
import { PlayGame } from 'scenes/PlayGame';
import { MainMenu } from 'scenes/MainMenu';
import { GameOver } from 'scenes/GameOver';
import { GAME_SCREEN, DEBUG_GAME_MANAGER_ITEM } from 'utils/constants';
import { guiDebugger } from 'utils/guiDebugger';
import { ControlsTrackball } from '../ControlsTrackball';
import { SceneLights } from '../SceneLights';

export const GameManager = () => {
  const [gameScreen, setGameScreen] = useRecoilState(gameScreenState);

  const gameScreenComponents = {
    [GAME_SCREEN.GAME_OVER]: GameOver,
    [GAME_SCREEN.LOADING]: Loading,
    [GAME_SCREEN.MAIN_MENU]: MainMenu,
    [GAME_SCREEN.PLAY]: PlayGame,
  };

  useEffect(() => {

  }, [gameScreen]);

  // Debug
  useEffect(() => {
    if (guiDebugger) {
      const debugObject = {
        gameScreen,
      };

      const existingFolder = guiDebugger.folders.find((folder) => {
        return folder._title === DEBUG_GAME_MANAGER_ITEM.GAME_MANAGER;
      });

      const gameScreenFolder = existingFolder ||
        guiDebugger.addFolder(DEBUG_GAME_MANAGER_ITEM.GAME_MANAGER).open();

      existingFolder?.controllers.find((controller) => {
        return controller._name === DEBUG_GAME_MANAGER_ITEM.GAME_SCENE;
      }) || gameScreenFolder.add(debugObject, 'gameScreen', {
        MAIN_MENU: GAME_SCREEN.MAIN_MENU,
        LOADING: GAME_SCREEN.LOADING,
        PLAY: GAME_SCREEN.PLAY,
        GAME_OVER: GAME_SCREEN.GAME_OVER,
      })
          .name(DEBUG_GAME_MANAGER_ITEM.GAME_SCENE)
          .onChange((screen) => setGameScreen(screen));
    }
  }, []);

  const Component = gameScreenComponents[gameScreen];

  return (
    <>
      <ControlsTrackball />
      <SceneLights />
      <Component />
    </>
  );
};
