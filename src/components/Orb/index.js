import React, { useEffect, useRef } from 'react';
import { addDebugItemSlider, guiDebugger } from 'utils/guiDebugger';
import { useRecoilState, useRecoilValue } from 'recoil';
import { orbDebugState, orbPropsState } from './store';

export const Orb = () => {
  const orbRef = useRef();
  const orbDebug = useRecoilValue(orbDebugState);
  const [{ scale, opacity }, setOrbState] = useRecoilState(orbPropsState);

  // Debug
  useEffect(() => {
    if (guiDebugger) {
      const debugObject = {
        opacity,
        scale,
      };

      const debugChangeFunctions = [
        (scaleFactor) => setOrbState((state) => {
          return {
            ...state,
            scale: scaleFactor,
          };
        }),
        (opacityFactor) => setOrbState((state) => {
          return {
            ...state,
            opacity: opacityFactor,
          };
        }),
      ];

      orbDebug.map((debugItem, index) => {
        addDebugItemSlider({
          changeFunction: debugChangeFunctions[index],
          controllerName: debugItem.controllerName,
          debugObject,
          debugObjectItemName: debugItem.debugObjectItemName,
          folderTitle: debugItem.folderTitle,
          min: debugItem.min,
          max: debugItem.max,
          step: debugItem.step,
        });
      });
    }
  }, []);

  return (
    <mesh
      ref={orbRef}
    >
      <sphereGeometry args={[scale, 32, 32]} />
      <meshStandardMaterial
        color={'purple'}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};
