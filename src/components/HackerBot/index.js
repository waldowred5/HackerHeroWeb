import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { guiDebugger } from 'utils/guiDebugger';
import { useRecoilState } from 'recoil';
import { hackerBotPropsState } from './store';
import { DEBUG_HACKER_BOT_ITEM } from 'utils/constants';
import PropTypes from 'prop-types';

export const HackerBot = ({ vector }) => {
  const hackerBotRef = useRef();
  const [{ radius }, setHackerBotState] = useRecoilState(hackerBotPropsState);
  const { x, y, z } = vector;

  useEffect(() => {
    hackerBotRef.current.lookAt(new THREE.Vector3(0, 0, 0));
  }, []);

  const debugObject = {
    radius,
  };

  // Debug
  useEffect(() => {
    if (guiDebugger) {
      const existingFolder = guiDebugger.folders.find((folder) => {
        return folder._title === DEBUG_HACKER_BOT_ITEM.HACKER_BOT;
      });

      const hackerBotFolder = existingFolder ||
        guiDebugger.addFolder(DEBUG_HACKER_BOT_ITEM.HACKER_BOT).open();

      existingFolder?.controllers.find((controller) => {
        return controller._name === DEBUG_HACKER_BOT_ITEM.RADIUS;
      }) || hackerBotFolder.add(debugObject, 'radius')
          .name(DEBUG_HACKER_BOT_ITEM.RADIUS)
          .min(0)
          .max(5)
          .step(0.1)
          .onChange((radiusFactor) => setHackerBotState((state) => {
            return {
              ...state,
              radius: radiusFactor,
            };
          }));
    }
  }, []);

  return (
    <mesh
      ref={hackerBotRef}
      type={'Hacker Bot'}
      position={[x, y, z]}
      // lookAt
    >
      <octahedronGeometry
        args={[radius, 0]}
      />
      <meshStandardMaterial
        color={0xFFFFFF}
      />
    </mesh>
  );
};

HackerBot.propTypes = {
  vector: PropTypes.object,
};
