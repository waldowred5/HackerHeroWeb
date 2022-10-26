import React from 'react';
import PropTypes from 'prop-types';
import { Edge } from '../Edge';
// import { useRecoilState } from 'recoil';
// import { existingEdgesState } from './store';

export const EdgeCollection = ({ adjacencyList }) => {
  // const [existingEdges, setExistingEdges] = useRecoilState(existingEdgesState);

  return (
    Object.keys(adjacencyList).map((nodeUuid) => {
      return adjacencyList[nodeUuid].edges.map((edge) => {
        const { fromVector, toVector } = edge;
        const { x: x1, y: y1, z: z1 } = fromVector;
        const { x: x2, y: y2, z: z2 } = toVector;

        console.log('New Edge Added');

        return (
          <Edge
            key={`Edge: [${x1}, ${y1}, ${z1}], [${x2}, ${y2}, ${z2}]`}
            fromCoords={fromVector}
            toCoords={toVector}
          />
        );
      });
    })
  );
};

EdgeCollection.propTypes = {
  adjacencyList: PropTypes.object,
};
