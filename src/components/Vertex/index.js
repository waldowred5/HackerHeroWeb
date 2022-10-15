import React, { useRef } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

export const Vertex = ({ hackerBotList, setHackerBotList, vector }) => {
  const vertexRef = useRef();
  const { x, y, z } = vector;

  const changeVertexColor = (event, color) => {
    event.eventObject.material.color =
      new THREE.Color(color);
  };

  const vertexClickHandler = (event) => {
    setHackerBotList(() => {
      return [
        ...hackerBotList,
        {
          vector: { x, y, z },
          nodeId: event.eventObject.uuid,
        },
      ];
    });
  };

  const vertexMaterial = new THREE.MeshStandardMaterial({
    color: 'grey',
    side: THREE.DoubleSide,
  });

  return (
    <mesh
      ref={vertexRef}
      position={[x, y, z]}
      onClick={(event) => vertexClickHandler(event, vector)}
      onPointerEnter={(event) => changeVertexColor(event, 'white')}
      onPointerLeave={(event) => changeVertexColor(event, 'grey')}
    >
      <sphereGeometry args={[0.12, 32, 32]} />
      <primitive
        object={vertexMaterial}
      />
    </mesh>
  );
};

Vertex.propTypes = {
  hackerBotList: PropTypes.array,
  setHackerBotList: PropTypes.func,
  vector: PropTypes.object,
};
