import React from 'react';
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import DEFAULT_FONT from 'three/examples/fonts/optimer_bold.typeface.json';
import { GAME_SCREEN } from '../../utils/constants';
import { useRecoilState } from 'recoil';
import { gameScreenState } from '../../components/GameManager/store';

extend({ TextGeometry });

export const GameOver = () => {
  const [, setGameScreen] = useRecoilState(gameScreenState);
  const font = new FontLoader().parse(DEFAULT_FONT);

  const textGeometryPrimary = new TextGeometry('Game Over', {
    font,
    height: 0.05,
    size: 0.5,
  });

  const textGeometryHero = new TextGeometry('You Lost', {
    font,
    height: 0.1,
    size: 1,
  });

  const textGeometryPlay = new TextGeometry('PLAY AGAIN?', {
    font,
    height: 0.1,
    size: 1,
  });

  textGeometryPrimary.center();
  textGeometryHero.center();
  textGeometryPlay.center();

  const highlightText = (event, color) => {
    event.object.material.color.set(color);
  };

  return (
    <>
      <mesh position={[0, 1, 0]}>
        <primitive object={textGeometryPrimary} />
        <meshLambertMaterial attach='material' color={'gold'} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <primitive object={textGeometryHero} />
        <meshLambertMaterial attach='material' color={'gold'} />
      </mesh>
      <mesh
        position={[0, -1.5, 0]}
        onPointerEnter={(event) => highlightText(event, 'white')}
        onPointerLeave={(event) => highlightText(event, 'lightblue')}
        onClick={() => setGameScreen(GAME_SCREEN.LOADING)}
      >
        <primitive object={textGeometryPlay} />
        <meshStandardMaterial attach='material' color={'lightblue'} />
      </mesh>
    </>
  );
};
