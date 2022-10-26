import React, { useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import DEFAULT_FONT from 'three/examples/fonts/optimer_bold.typeface.json';
import PropTypes from 'prop-types';
import { guiDebugger } from '../../utils/guiDebugger';

extend({ TextGeometry });

export const NodeDebugText = ({ vertexUuid, vector }) => {
  const debugTextRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const { camera } = useThree();
  const { x, y, z } = vector;

  useFrame(() => {
    debugTextRef.current.lookAt(camera.position);
    debugTextRef.current.quaternion.copy(camera.quaternion);
  });

  const font = new FontLoader().parse(DEFAULT_FONT);

  // console.log('vertexUuid', vertexUuid);

  const textGeometryPrimary = new TextGeometry(`${vertexUuid?.slice(0, 4)}`, {
  // const textGeometryPrimary = new TextGeometry(`${vertexUuid.uuid.slice(0, 4)}`, {
    font,
    height: 0.05,
    size: 0.15,
  });

  textGeometryPrimary.center();

  return (
    <mesh
      ref={debugTextRef}
      position={[x, y, z]}
    >
      <primitive object={textGeometryPrimary} />
      <meshLambertMaterial
        attach='material'
        color={'lightblue'}
        opacity={guiDebugger ? 1 : 0}
      />
    </mesh>
  );
};

NodeDebugText.propTypes = {
  vertexUuid: PropTypes.string,
  vector: PropTypes.object,
};
