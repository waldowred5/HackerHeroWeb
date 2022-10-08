import React from 'react';

export const Orb = () => {
  return (
    <mesh>
      <sphereGeometry args={[1.9, 32, 32]} />
      <meshStandardMaterial
        color={0xFFFFFF}
        transparent={true}
        opacity={0.4}
      />
    </mesh>
  );
};
