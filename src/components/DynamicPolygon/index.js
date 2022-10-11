/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
// import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  lineDrawThresholdPercentageState,
  nodesState,
  vertexNumberState,
  vertexPlacementChaosFactorState, vertexPointsState,
  verticesState,
} from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { guiDebugger } from '../../utils/guiDebugger';
import { DEBUG_GRAPH_ITEM, GAME_SCREEN } from '../../utils/constants';
import { gameScreenState } from '../GameManager/store';
// import { useThree } from '@react-three/fiber';
// import { v4 as uuid } from 'uuid';

// Utils
const radius = 2;
// const vertexNumber = 40;
// const vertexPlacementChaosFactor = 52;
// const lineDrawThresholdPercentage = 0.7;
// TODO set separate data file
// const nodes = Array.from(Array(vertexNumber));

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
export const DynamicPolygon = () => {
  const pointsRef = useRef();
  // const lineRefs = useRef([]);
  const ringsGroup = useRef();


  const nodes = useRecoilValue(nodesState);
  const [vertexNumber, setVertexNumber] = useRecoilState(vertexNumberState);
  const [vertexPoints, setVertexPoints] = useRecoilState(vertexPointsState);
  const [vertices, setVertices] = useRecoilState(verticesState);
  const [
    lineDrawThresholdPercentage,
    setLineDrawThresholdPercentage,
  ] = useRecoilState(lineDrawThresholdPercentageState);
  const [
    vertexPlacementChaosFactor,
    setVertexPlacementChaosFactor,
  ] = useRecoilState(vertexPlacementChaosFactorState);

  // TODO Don't leave this here... let a manager handle this
  const [, setGameScreen] = useRecoilState(gameScreenState);

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

  const ringClickHandler = (event) => {
    ringsGroup.current.children.map((child) => {
      return child.scale.set(1, 1, 1);
    });

    event.eventObject.scale.set(1.4, 1.4, 1.4);

    // TODO Don't leave this here... let a manager handle this
    setGameScreen(GAME_SCREEN.GAME_OVER);
  };

  const changeRingColor = (event, color) => {
    event.eventObject.children[0].material.color =
      new THREE.Color(color);
  };

  useFrame((state) => {
    const { camera } = state;

    ringsGroup.current.children.forEach((ring) => {
      ring.lookAt(camera.position);
    });
  });

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
        {/* <pointsMaterial color={0xff0000} size={0.2} />*/}
      </points>
      <group
        ref={ringsGroup}
      >
        {
          vertexPoints.vectors.map((vector, i) => {
            const { x, y, z } = vector;

            const ringMaterial = new THREE.MeshStandardMaterial({
              // color: 0xFFFFFF,
              color: 0x484848,
              side: THREE.DoubleSide,
            });

            return (
              <mesh
                key={`Invisible Ring Hitbox ${i}: ${vector.x}`}
                position={[x, y, z]}
                onClick={(event) => ringClickHandler(event)}
                onPointerEnter={(event) => changeRingColor(event, 'white')}
                onPointerLeave={(event) => changeRingColor(event, 0x484848)}
                /* TODO Fix this typing with constants */
                type="Invisible Ring Hitbox"
              >
                <ringGeometry args={[0, 0.09, 32]} />
                <meshStandardMaterial
                  color={0xFFFFFF}
                  transparent={true}
                  opacity={0}
                />
                <mesh
                  key={`Visible Ring ${i}: ${vector.x}`}
                  /* TODO Fix this typing with constants */
                  type="Visible Ring"
                >
                  <ringGeometry args={[0.06, 0.08, 32]} />
                  <primitive
                    object={ringMaterial}
                  />
                </mesh>
              </mesh>
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
              // const lineGeom = new THREE.BufferGeometry().setFromPoints([
              //   outerPointCoords,
              //   innerPointCoords,
              // ]);
              // const line = new THREE.Line(
              //     lineGeom,
              //     new THREE.LineBasicMaterial({ color: 0x0cff00 }),
              // );
              //
              // return (
              //   <primitive
              //     key={`${i}: ${outerPointCoords.x}, ${innerPointCoords.x}`}
              //     ref={(element) => lineRefs.current[j] = element}
              //     object={line}
              //   />
              // );

              const endPoints = [];
              for (let i = 0; i < array.length - 1; i++) {
                endPoints.push({ a: outerPointCoords, b: innerPointCoords });
              }

              for (const { a, b } of endPoints) {
                // stick has length equal to distance between endpoints
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

                // const upVector = new THREE.Vector3(0, 0, 1);
                // const direction = new THREE.Vector3();
                // const vector = direction.subVectors(
                //     outerPointCoords,
                //     innerPointCoords,
                // );

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
