import React, { useEffect, useRef } from 'react';
import { guiDebugger } from 'utils/guiDebugger';
import { useRecoilState } from 'recoil';
import { orbPropsState } from './store';
import { ORB_DEBUG_ITEM } from 'utils/constants';

export const Orb = () => {
  const orbRef = useRef();
  const [{ scale, opacity }, setOrbState] = useRecoilState(orbPropsState);

  const debugObject = {
    opacity,
    scale,
  };

  // Debug
  useEffect(() => {
    if (guiDebugger) {
      const existingFolder = guiDebugger.folders.find((folder) => {
        return folder._title === ORB_DEBUG_ITEM.ORB;
      });

      const orbFolder = existingFolder ||
        guiDebugger.addFolder(ORB_DEBUG_ITEM.ORB).open();

      existingFolder?.controllers.find((controller) => {
        return controller._name === ORB_DEBUG_ITEM.SCALE;
      }) || orbFolder.add(debugObject, 'scale')
          .name(ORB_DEBUG_ITEM.SCALE)
          .min(0)
          .max(5)
          .step(0.1)
          .onChange((scaleFactor) => setOrbState((state) => {
            return {
              ...state,
              scale: scaleFactor,
            };
          }));

      existingFolder?.controllers.find((controller) => {
        return controller._name === ORB_DEBUG_ITEM.OPACITY;
      }) || orbFolder.add(debugObject, 'opacity')
          .name(ORB_DEBUG_ITEM.OPACITY)
          .min(0)
          .max(1)
          .step(0.01)
          .onChange((opacityFactor) => setOrbState((state) => {
            return {
              ...state,
              opacity: opacityFactor,
            };
          }));
    }
  }, []);

  return (
    <mesh
      ref={orbRef}
    >
      <sphereGeometry args={[scale, 32, 32]} />
      <meshStandardMaterial
        color={0xFFFFFF}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};
