import React from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

export const Edge = ({ outerCoords, innerCoords }) => {
  const cylinderRadius = 0.02;
  const cylinderTesselation = {
    radial: 16,
    length: 32,
  };

  const distance = outerCoords.distanceTo(innerCoords);
  const cylinderGeom = new THREE.CylinderGeometry(
      cylinderRadius,
      cylinderRadius,
      distance,
      cylinderTesselation.radial,
      cylinderTesselation.length,
  );

  cylinderGeom.translate(0, distance / 2, 0);
  cylinderGeom.rotateX(Math.PI / 2);

  const cylinder = new THREE.Mesh(
      cylinderGeom,
      new THREE.MeshStandardMaterial({
        color: 'grey',
      }),
  );

  cylinder.position.copy(innerCoords);
  cylinder.lookAt(outerCoords);

  return (
    <primitive
      object={cylinder}
    />
  );
};

Edge.propTypes = {
  outerCoords: PropTypes.object,
  innerCoords: PropTypes.object,
};
