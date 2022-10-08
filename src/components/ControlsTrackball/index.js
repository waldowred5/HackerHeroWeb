import React, { useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { TrackballControls } from
  'three/examples/jsm/controls/TrackballControls.js';

extend({ TrackballControls });

export const ControlsTrackball = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef();
  useFrame(() => controls.current.update());

  return (
    <trackballControls
      ref={controls}
      args={[camera, domElement]}
      noZoom={false}
      rotateSpeed={6}
      dynamicDampingFactor={0.1}
    />
  );
};
