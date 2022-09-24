import React from 'react';
import { useThree } from '@react-three/fiber';
import { ControlsTrackball } from '../ControlsTrackball';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { DynamicPolygon } from '../DynamicPolygon';

export const HeroCanvas = () => {
  const { gl, canvas, scene, camera } = useThree();

  console.log({ gl, canvas, scene, camera });

  return (
    <>
      <ControlsTrackball />
      <pointLight args={[0xFFFFFF, 10]} />
      <DynamicPolygon />
    </>
  );
};

HeroCanvas.propTypes = {
  // lights: PropTypes.array,
  // trigPaths: PropTypes.array,
};
