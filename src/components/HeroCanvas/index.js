import React from 'react';
// import { PointLightHelper } from 'three';
// import { useHelper } from '@react-three/drei';
import { ControlsTrackball } from 'components/ControlsTrackball';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { DynamicPolygon } from 'components/DynamicPolygon';
import { Orb } from 'components/Orb';
import { SceneLights } from 'components/SceneLights';

export const HeroCanvas = () => {
  return (
    <>
      <ControlsTrackball />
      <SceneLights />
      <DynamicPolygon />
      <Orb />
    </>
  );
};

HeroCanvas.propTypes = {
  // lights: PropTypes.array,
  // trigPaths: PropTypes.array,
};
