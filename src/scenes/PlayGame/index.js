import React from 'react';
import { ServerOrb } from 'components/ServerOrb';
import { Orb } from 'components/Orb';
import { useFrame } from '@react-three/fiber';

export const PlayGame = () => {
  useFrame((state) => {
    const { scene } = state;

    scene.rotation.z -= 0.0005;
    scene.rotation.x -= 0.001;
  });


  return (
    <>
      <ServerOrb />
      <Orb />
    </>
  );
};
