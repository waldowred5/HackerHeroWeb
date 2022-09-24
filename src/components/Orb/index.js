// eslint-disable-next-line no-unused-vars
import React, { useCallback, useMemo, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';

export const Orb = () => {
  return (
    <mesh>
      <sphereGeometry args={[1.7, 32, 32]} />
      <meshStandardMaterial
        color={'orange'}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};
