import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useRecoilState } from 'recoil';
import { hackerBotPropsState } from './store';
import PropTypes from 'prop-types';

export const HackerBot = ({ vector }) => {
  const hackerBotRef = useRef();
  const [{ radius }] = useRecoilState(hackerBotPropsState);
  const { x, y, z } = vector;

  useEffect(() => {
    hackerBotRef.current.lookAt(new THREE.Vector3(0, 0, 0));
  }, []);

  return (
    <mesh
      ref={hackerBotRef}
      type={'Hacker Bot'}
      position={[x, y, z]}
    >
      <octahedronGeometry
        args={[radius, 0]}
      />
      <meshStandardMaterial
        color={'blue'}
      />
    </mesh>
  );
};

HackerBot.propTypes = {
  vector: PropTypes.object,
};
