/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  lineDrawThresholdPercentageState,
  nodesState,
  vertexNumberState,
  vertexPlacementChaosFactorState,
  vertexPointsState,
  serverOrbPropsState,
  verticesState,
} from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { guiDebugger } from '../../utils/guiDebugger';
import { DEBUG_GRAPH_ITEM } from '../../utils/constants';
import { hackerBotListState } from '../HackerBot/store';
import { HackerBot } from '../HackerBot';

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

// Component
// TODO Split out children into separate components
export const ServerOrb = () => {
  const pointsRef = useRef();
  const nodesGroup = useRef();
  const hackerBotsGroup = useRef();

  const [{ radius }, setServerOrbProps] = useRecoilState(serverOrbPropsState);

  const nodes = useRecoilValue(nodesState);
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
  const debugObject = {
    lineDrawThresholdPercentage,
    vertexNumber,
    vertexPlacementChaosFactor,
  };

  // Debug
  useEffect(() => {
    if (guiDebugger) {
      setHackerBotList([]);

      const existingFolder = guiDebugger.folders.find((folder) => {
        return folder._title === DEBUG_GRAPH_ITEM.GRAPH;
      });

      const graphFolder = existingFolder ||
        guiDebugger.addFolder(DEBUG_GRAPH_ITEM.GRAPH).open();

      existingFolder?.controllers.find((controller) => {
        return controller._name === DEBUG_GRAPH_ITEM.VERTEX_NUMBER;
      }) || graphFolder.add(debugObject, 'vertexNumber')
          .name(DEBUG_GRAPH_ITEM.VERTEX_NUMBER)
          .min(1)
          .max(150)
          .step(1)
          .onChange((number) => setVertexNumber(number));

      existingFolder?.controllers.find((controller) => {
        return controller._name ===
          DEBUG_GRAPH_ITEM.VERTEX_PLACEMENT_CHAOS_MODIFIER;
      }) || graphFolder.add(debugObject, 'vertexPlacementChaosFactor')
          .name(DEBUG_GRAPH_ITEM.VERTEX_PLACEMENT_CHAOS_MODIFIER)
          .min(0.1)
          .max(1500)
          .step(0.1)
          .onChange((number) => setVertexPlacementChaosFactor(number));

      existingFolder?.controllers.find((controller) => {
        return controller._name ===
          DEBUG_GRAPH_ITEM.LINE_DRAW_THRESHOLD_PERCENTAGE;
      }) || graphFolder.add(debugObject, 'lineDrawThresholdPercentage')
          .name(DEBUG_GRAPH_ITEM.LINE_DRAW_THRESHOLD_PERCENTAGE)
          .min(0.01)
          .max(1)
          .step(0.01)
          .onChange((number) => setLineDrawThresholdPercentage(number));
    }
  }, [lineDrawThresholdPercentage, vertexNumber, vertexPlacementChaosFactor]);

  const nodeClickHandler = (event, vector) => {
    const { x, y, z } = vector;

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

  const changeNodeColor = (event, color) => {
    event.eventObject.material.color =
      new THREE.Color(color);
  };

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
            const { x, y, z } = vector;

            const nodeMaterial = new THREE.MeshStandardMaterial({
              color: 0x484848,
              side: THREE.DoubleSide,
            });

            return (
              <mesh
                key={`Node ${i}: ${vector.x}`}
                position={[x, y, z]}
                onClick={(event) => nodeClickHandler(event, vector)}
                onPointerEnter={(event) => changeNodeColor(event, 'white')}
                onPointerLeave={(event) => changeNodeColor(event, 0x484848)}
              >
                <sphereGeometry args={[0.09, 32, 32]} />
                <primitive
                  object={nodeMaterial}
                />
              </mesh>
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
                endPoints.push({ a: outerPointCoords, b: innerPointCoords });
              }

              for (const { a, b } of endPoints) {
                const cylinderRadius = 0.02;
                const cylinderTesselation = {
                  radial: 16,
                  length: 32,
                };

                const distance = a.distanceTo(b);
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
                      color: 0x0cff00,
                    }),
                );

                cylinder.position.copy(innerPointCoords);
                cylinder.lookAt(outerPointCoords);

                const { x, y, z } = cylinder.position;

                return (
                  <primitive
                    key={`Edge: ${x}, ${y}, ${z}`}
                    object={cylinder}
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
