// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import { NODE_OWNER } from 'utils/constants';
import { guiDebugger } from '../../utils/guiDebugger';
import { NodeDebugText } from '../NodeDebugText';

export const Vertex = (
    {
      hackerBotList,
      setHackerBotList,
      nodeList,
      setNodeList,
      setAdjacencyList,
      vector,
      debugUuid = '',
    },
) => {
  const vertexRef = useRef();
  const { x, y, z } = vector;

  useEffect(() => {
    setNodeList((state) => {
      return [
        ...state,
        {
          nodeColor: 'grey',
          nodeId: vertexRef.current.uuid,
          nodeOwner: NODE_OWNER.NEUTRAL,
          vector: { x, y, z },
        },
      ];
    });
  }, []);

  const changeVertexColor = (event, color) => {
    const nodeOwner =
      nodeList
          .find((node) => node.nodeId === event.eventObject.uuid)
          .nodeOwner;

    if (nodeOwner === NODE_OWNER.NEUTRAL) {
      event.eventObject.material.color =
        new THREE.Color(color);
    }

    if (nodeOwner === NODE_OWNER.PLAYER_1 && color === 'white') {
      event.eventObject.material.color =
        new THREE.Color('cyan');
    }

    if (nodeOwner === NODE_OWNER.PLAYER_1 && color === 'grey') {
      event.eventObject.material.color =
        new THREE.Color('blue');
    }
  };

  const vertexClickHandler = (event) => {
    setHackerBotList(() => {
      return [
        ...hackerBotList,
        {
          nodeId: event.eventObject.uuid,
          botOwner: NODE_OWNER.PLAYER_1,
          vector: { x, y, z },
        },
      ];
    });

    setNodeList((state) => {
      const newNodeList = state.filter((node) => {
        return node.nodeId !== event.eventObject.uuid;
      });

      return [
        ...newNodeList,
        {
          nodeColor: 'blue',
          nodeId: event.eventObject.uuid,
          nodeOwner: NODE_OWNER.PLAYER_1,
          vector: { x, y, z },
        },
      ];
    });
  };

  setAdjacencyList((state) => {

  });

  return (
    <>
      {
        <>
          <mesh
            ref={vertexRef}
            position={[x, y, z]}
            onClick={(event) => vertexClickHandler(event, vector)}
            onPointerEnter={(event) => changeVertexColor(event, 'white')}
            onPointerLeave={(event) => changeVertexColor(event, 'grey')}
          >
            <sphereGeometry args={[0.12, 32, 32]}/>
            <meshStandardMaterial
              color={'grey'}
              side={THREE.DoubleSide}
              transparent={true}
              opacity={guiDebugger ? 0.3 : 1}
            />
          </mesh>
          <NodeDebugText
            vertexUuid={debugUuid}
            vector={vector}
          />
        </>
      }
    </>
  );
};

Vertex.propTypes = {
  hackerBotList: PropTypes.array,
  nodeList: PropTypes.array,
  setAdjacencyList: PropTypes.func,
  setHackerBotList: PropTypes.func,
  setNodeList: PropTypes.func,
  vector: PropTypes.object,
  debugUuid: PropTypes.string,
};
