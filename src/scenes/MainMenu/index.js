import React from 'react';
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import DEFAULT_FONT from 'three/examples/fonts/optimer_bold.typeface.json';
import { gameScreenState } from '../../components/GameManager/store';
import { useRecoilState } from 'recoil';
import { GAME_SCREEN } from '../../utils/constants';

extend({ TextGeometry });

export const MainMenu = () => {
  const [, setGameScreen] = useRecoilState(gameScreenState);
  const font = new FontLoader().parse(DEFAULT_FONT);

  const textGeometryPrimary = new TextGeometry('Main Menu', {
    font,
    height: 0.05,
    size: 0.5,
  });

  const textGeometryHero = new TextGeometry('Hacker Hero', {
    font,
    height: 0.1,
    size: 0.75,
  });

  const textGeometryPlay = new TextGeometry('PLAY GAME', {
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
      <mesh position={[0, 2, 0]}>
        <primitive object={textGeometryPrimary} />
        <meshStandardMaterial attach='material' color={'gold'} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <primitive object={textGeometryHero} />
        <meshStandardMaterial attach='material' color={'gold'} />
      </mesh>
      <mesh
        position={[0, -1, 0]}
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
