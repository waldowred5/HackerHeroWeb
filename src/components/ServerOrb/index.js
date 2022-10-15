import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  lineDrawThresholdPercentageState,
  nodesState,
  vertexNumberState,
  vertexPlacementChaosFactorState,
  vertexPointsState,
  serverOrbPropsState,
  verticesState, serverOrbDebugState,
} from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addDebugItemSlider, guiDebugger } from '../../utils/guiDebugger';
import { hackerBotListState } from '../HackerBot/store';
import { HackerBot } from '../HackerBot';
import { Vertex } from '../Vertex';
import { Edge } from '../Edge';

const getFibonacciSpherePoints = ({
  nodes = 1,
  radius = 1,
  vertexPlacementChaosFactor,
  vertexNumber,
}) => {
  const offset = 2 / nodes.length;
  const increment = Math.PI * (3 - Math.sqrt(5));

  return nodes.reduce((acc, sample, index) => {
    const chaosLevel = 1 + Math.random() *
      vertexPlacementChaosFactor / vertexNumber / 1000;
    const yMod = ((index * offset) - 1) + (offset / 2);
    const distance = Math.sqrt(1 - Math.pow(yMod, 2));
    const phi = ((index + 1) % nodes.length) * increment * chaosLevel;
    const zMod = Math.sin(phi) * distance;
    const xMod = Math.cos(phi) * distance;
    const x = xMod * radius;
    const y = yMod * radius;
    const z = zMod * radius;

    return {
      coords: [...acc.coords, x, y, z],
      vectors: [...acc.vectors, new THREE.Vector3(x, y, z)],
    };
  },
  { coords: [], vectors: [] });
};

export const ServerOrb = () => {
  const pointsRef = useRef();
  const nodesGroup = useRef();
  const hackerBotsGroup = useRef();

  const { radius } = useRecoilValue(serverOrbPropsState);

  const nodes = useRecoilValue(nodesState);
  const serverOrbDebug = useRecoilValue(serverOrbDebugState);

  const [vertexNumber, setVertexNumber] = useRecoilState(vertexNumberState);
  const [vertexPoints, setVertexPoints] = useRecoilState(vertexPointsState);
  const [vertices, setVertices] = useRecoilState(verticesState);
  const [hackerBotList, setHackerBotList] = useRecoilState(hackerBotListState);

  const [
    lineDrawThresholdPercentage,
    setLineDrawThresholdPercentage,
  ] = useRecoilState(lineDrawThresholdPercentageState);
  const [
    vertexPlacementChaosFactor,
    setVertexPlacementChaosFactor,
  ] = useRecoilState(vertexPlacementChaosFactorState);

  // Init vertices
  useEffect(() => {
    setVertexPoints(getFibonacciSpherePoints(
        {
          nodes,
          radius,
          vertexPlacementChaosFactor,
          vertexNumber,
        },
    ));

    setVertices(new Float32Array(
        vertexPoints.coords.reduce((acc, point) => {
          return [...acc, point];
        }, []),
    ));
  }, [lineDrawThresholdPercentage, vertexNumber, vertexPlacementChaosFactor]);

  // Debug
  useEffect(() => {
    // Reset hackerBots on level reset
    setHackerBotList([]);

    if (guiDebugger) {
      const debugObject = {
        lineDrawThresholdPercentage,
        vertexNumber,
        vertexPlacementChaosFactor,
      };

      const debugChangeFunctions = [
        (value) => setVertexNumber(value),
        (value) => setVertexPlacementChaosFactor(value),
        (value) => setLineDrawThresholdPercentage(value),
      ];

      serverOrbDebug.map((debugItem, index) => {
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
  }, [lineDrawThresholdPercentage, vertexNumber, vertexPlacementChaosFactor]);

  return (
    <>
      <points
        ref={pointsRef}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={vertices.length / 3}
            array={vertices}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={0xff0000} visible={false} />
      </points>
      <group
        ref={nodesGroup}
      >
        {
          vertexPoints.vectors.map((vector, i) => {
            return (
              <Vertex
                key={`Vertex ${i}: ${vector.x}`}
                hackerBotList={hackerBotList}
                setHackerBotList={setHackerBotList}
                vector={vector}
              />
            );
          })
        }
      </group>
      <group
        ref={hackerBotsGroup}
      >
        {
          hackerBotList.map((hackerBot, index) => {
            const { vector } = hackerBot;

            return (
              <HackerBot
                key={`HackerBot ${index}: ${hackerBot.x}`}
                vector={vector}
              />
            );
          })
        }
      </group>
      {
        vertexPoints.vectors.map((outerPointCoords, i, array) => {
          return vertexPoints.vectors.map((innerPointCoords, j) => {
            if (j <= i) {
              return;
            }

            if (
              outerPointCoords.distanceTo(innerPointCoords) <
              radius * lineDrawThresholdPercentage
            ) {
              const endPoints = [];
              for (let i = 0; i < array.length - 1; i++) {
                endPoints.push({ outerPointCoords, innerPointCoords });
              }

              const { x: x1, y: y1, z: z1 } = outerPointCoords;
              const { x: x2, y: y2, z: z2 } = innerPointCoords;

              for (const { outerPointCoords, innerPointCoords } of endPoints) {
                return (
                  <Edge
                    key={`Edge: [${x1}, ${y1}, ${z1}], [${x2}, ${y2}, ${z2}]`}
                    outerCoords={outerPointCoords}
                    innerCoords={innerPointCoords}
                  />
                );
              }
            }
          });
        })
      }
    </>
  );
};
