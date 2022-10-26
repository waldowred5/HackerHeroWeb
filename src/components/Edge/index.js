import React from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

export const Edge = ({ fromCoords, toCoords }) => {
  const cylinderRadius = 0.02;
  const cylinderTesselation = {
    radial: 16,
    length: 32,
  };

  const distance = fromCoords.distanceTo(toCoords);
  const cylinderGeom = new THREE.CylinderGeometry(
      cylinderRadius,
      cylinderRadius,
      distance * 0.45,
      // distance,
      cylinderTesselation.radial,
      cylinderTesselation.length,
  );

  cylinderGeom.translate(0, distance / 1.25, 0);
  // cylinderGeom.translate(0, distance / 2, 0);
  cylinderGeom.rotateX(Math.PI / 2);

  const cylinder = new THREE.Mesh(
      cylinderGeom,
      new THREE.MeshStandardMaterial({
        color: 'grey',
      }),
  );

  cylinder.position.copy(toCoords);
  cylinder.lookAt(fromCoords);

  return (
    <primitive
      object={cylinder}
    />
  );
};

Edge.propTypes = {
  fromCoords: PropTypes.object,
  toCoords: PropTypes.object,
};
