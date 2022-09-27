// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
// import { useThree } from '@react-three/fiber';
// import { v4 as uuid } from 'uuid';

// TODO Move this into its own Util
const pointer = new THREE.Vector2();

const onPointerMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

window.addEventListener('pointermove', onPointerMove);

// Utils
const radius = 2;
const chaosModifier = 0.02;
const nodeNumber = 40;
const lineDrawThresholdPercentage = 0.7;
// TODO set separate data file
const nodes = Array.from(Array(nodeNumber));

const getFibonacciSpherePoints = (nodes = 1, radius = 1) => {
  const offset = 2 / nodes.length;
  const increment = Math.PI * (3 - Math.sqrt(5));

  return nodes.reduce((acc, sample, index) => {
    const chaosLevel = 1 + Math.random() * chaosModifier;
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

const vertexPoints = getFibonacciSpherePoints(nodes, radius);

const vertices = new Float32Array(
    vertexPoints.coords.reduce((acc, point) => {
      return [...acc, point];
    }, []),
);

// Component
// TODO Split out children into separate components
export const DynamicPolygon = () => {
  const pointsRef = useRef();
  const lineRefs = useRef([]);
  const ringsGroup = useRef();

  const changeRingColor = (raycaster) => {
    const intersects = raycaster.intersectObjects(
        ringsGroup.current.children,
        false,
    );

    if (intersects.length > 0) {
      intersects[0].object.children[0].material.color =
        new THREE.Color('white');
    }

    // TODO This may cause memory leaks, do this material resetting properly!
    if (intersects.length === 0) {
      ringsGroup.current.children.map((ringTrigger) => {
        ringTrigger.children[0].material = new THREE.MeshStandardMaterial({
          color: 0x484848,
          side: THREE.DoubleSide,
        });
      });
    }
  };

  useFrame((state) => {
    const { camera, raycaster } = state;

    ringsGroup.current.children.forEach((ring) => {
      ring.lookAt(camera.position);
    });

    changeRingColor(raycaster);
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
              color: 0x484848,
              side: THREE.DoubleSide,
            });

            return (
              <mesh
                key={`Invisible Ring Trigger ${i}: ${vector.x}`}
                position={[x, y, z]}
              >
                <ringGeometry args={[0, 0.09, 32]} />
                <meshStandardMaterial
                  color={0xFFFFFF}
                  transparent={true}
                  opacity={0}
                />
                <mesh
                  key={`Visible Ring ${i}: ${vector.x}`}
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
        vertexPoints.vectors.map((outerPointCoords, i) => {
          return vertexPoints.vectors.map((innerPointCoords, j) => {
            if (j <= i) {
              return;
            }

            if (
              outerPointCoords.distanceTo(innerPointCoords) <
              radius * lineDrawThresholdPercentage
            ) {
              const lineGeom = new THREE.BufferGeometry().setFromPoints([
                outerPointCoords,
                innerPointCoords,
              ]);
              const line = new THREE.Line(
                  lineGeom,
                  new THREE.LineBasicMaterial({ color: 0x0cff00 }),
              );

              return (
                <primitive
                  key={`${i}: ${outerPointCoords.x}, ${innerPointCoords.x}`}
                  ref={(element) => lineRefs.current[j] = element}
                  object={line}
                />
              );
            }
          });
        })
      }
    </>
  );
};
