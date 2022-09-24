// eslint-disable-next-line no-unused-vars
import React, { useCallback, useMemo, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// TODO set separate data file
const nodes = Array.from(Array(60));

// Utils
const radius = 2;

const getPoint = (radius) => {
  // https://stackoverflow.com/questions/969798/plotting-a-point-on-the-edge-of-a-sphere
  const angleS = 360 * Math.random();
  const angleT = 360 * Math.random();

  const x = radius * Math.cos(angleS) * Math.sin(angleT);
  const y = radius * Math.sin(angleS) * Math.sin(angleT);
  const z = radius * Math.cos(angleT);

  return [x, y, z];
};

const buildCoords = (coords) => {
  return coords.reduce((acc, coord, i, array) => {
    if (i % 3 === 2) {
      return [...acc, new THREE.Vector3(array[i - 2], array[i - 1], array[i])];
    }

    return acc;
  }, []);
};

const vertexPoints = nodes.reduce((acc, dataPoint) => {
  const point = getPoint(radius);

  return [...acc, ...point];
}, []);

const vertices = new Float32Array(vertexPoints);

const processedPoints = buildCoords(vertexPoints);

// Component
export const DynamicPolygon = () => {
  const pointsRef = useRef();

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
        <pointsMaterial color={0xff0000} size={0.1} />
      </points>
      {
        // TODO Clean this shit up
        processedPoints.map((outerPointCoords, i, array) => {
          for (let j = i + 1; j < array.length; j++) {
            const innerPointCoords = array[j];

            if (outerPointCoords.distanceTo(innerPointCoords) < radius) {
              const lineGeom = new THREE.BufferGeometry().setFromPoints([
                outerPointCoords,
                innerPointCoords,
              ]);
              const line = new THREE.Line(
                  lineGeom,
                  new THREE.LineBasicMaterial({ color: 'cyan' }),
              );
              return (
                <primitive key={`${i}: ${outerPointCoords}`} object={line} />
              );
            }
          }
        })
      }
    </>
  );
};
