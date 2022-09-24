import React, { useRef } from 'react';
import { PointLightHelper } from 'three';
import { useThree } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';
import { ControlsTrackball } from '../ControlsTrackball';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { DynamicPolygon } from '../DynamicPolygon';
import { Orb } from '../Orb';

export const HeroCanvas = () => {
  const lightRef = useRef();
  useHelper(lightRef, PointLightHelper, 0.2, '#F0F');

  const { gl, canvas, scene, camera } = useThree();
  console.log({ gl, canvas, scene, camera });

  return (
    <>
      <ControlsTrackball />
      <ambientLight args={[0xFFFFFF, 1]} />
      <pointLight
        args={[0xFFFFFF]}
        ref={lightRef}
        position={[0, 0, 3]}
        intensity={10}
      />
      <DynamicPolygon />
      <Orb />
    </>
  );
};

HeroCanvas.propTypes = {
  // lights: PropTypes.array,
  // trigPaths: PropTypes.array,
};
