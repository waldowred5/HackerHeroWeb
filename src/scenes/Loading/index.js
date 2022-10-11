import React, { useEffect } from 'react';
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import DEFAULT_FONT from 'three/examples/fonts/optimer_bold.typeface.json';
import { useRecoilState } from 'recoil';
import { gameScreenState } from '../../components/GameManager/store';
import { GAME_SCREEN } from '../../utils/constants';

extend({ TextGeometry });

export const Loading = () => {
  const [, setGameScreen] = useRecoilState(gameScreenState);

  useEffect(() => {
    setTimeout(() => setGameScreen(GAME_SCREEN.PLAY), 2000);
  }, []);

  const font = new FontLoader().parse(DEFAULT_FONT);

  const textGeometryPrimary = new TextGeometry('Loading...', {
    font,
    height: 0.05,
    size: 1,
  });

  textGeometryPrimary.center();

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <primitive object={textGeometryPrimary} />
        <meshLambertMaterial attach='material' color={'lightblue'} />
      </mesh>
    </>
  );
};
