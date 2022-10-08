import React, { useRef } from 'react';
// import { useHelper } from '@react-three/drei';
// import { PointLightHelper } from 'three';

const lights = [
  { color: 0xf100ff, intensity: 6, distance: 12, x: 1, y: 0, z: 10 },
  { color: 0xc56cef, intensity: 6, distance: 12, x: -2, y: 1, z: -10 },
  { color: 0x000078, intensity: 3, distance: 10, x: 0, y: 10, z: 1 },
  { color: 0x00ffdd, intensity: 6, distance: 12, x: 0, y: -10, z: -1 },
  { color: 0x16a7f5, intensity: 6, distance: 12, x: 10, y: 3, z: 0 },
  { color: 0x000078, intensity: 6, distance: 12, x: -10, y: -1, z: 0 },
];

export const LightsArray = () => {
  const pointLightRefs = useRef([]);
  // useHelper(pointLightRefs, PointLightHelper, 0.2, '#FF00FF');

  return (
    <>
      <ambientLight
        color={0x0000FF}
        intensity={3}
      />
      {
        lights.map((light, index) => {
          const { color, intensity, distance, x, y, z } = light;

          return (
            <pointLight
              key={`${light.color}: ${light.x}, ${light.y}, ${light.z}`}
              ref={(element) => pointLightRefs.current[index] = element}
              color={color}
              intensity={intensity}
              distance={distance}
              position={[x, y, z]}
            />
          );
        })
      }
    </>
  );
};
