import React from 'react';
// import { PointLightHelper } from 'three';
// import { useHelper } from '@react-three/drei';
import { ControlsTrackball } from '../ControlsTrackball';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { DynamicPolygon } from '../DynamicPolygon';
import { Orb } from '../Orb';
import { LightsArray } from '../LightsArray';

export const HeroCanvas = () => {
  return (
    <>
      <ControlsTrackball />
      <LightsArray />
      <DynamicPolygon />
      <Orb />
    </>
  );
};

HeroCanvas.propTypes = {
  // lights: PropTypes.array,
  // trigPaths: PropTypes.array,
};
