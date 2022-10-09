import React, { useEffect, useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { PointLightHelper } from 'three';
import { useRecoilState, useRecoilValue } from 'recoil';
import { lightsDebugState, sceneLightsState } from './store';
import { guiDebugger } from 'utils/guiDebugger';
import { LIGHTS_DEBUG_ITEM } from 'utils/constants';

export const SceneLights = () => {
  const lights = useRecoilValue(sceneLightsState);
  // const [lights, setLights] = useRecoilState(sceneLightsState);
  const [
    enableLightHelpers,
    setEnableLightHelpers,
  ] = useRecoilState(lightsDebugState);

  const debugObject = {
    enableLightHelpers,
    lights,
  };

  // const debugColorObject = {
  //   colors: [
  //     { color: 0xf100ff },
  //     { color: 0xc56cef },
  //     { color: 0x0000FF },
  //     { color: 0x00ffdd },
  //     { color: 0x16a7f5 },
  //     { color: 0x0000FF },
  //   ],
  // };

  // Debug
  useEffect(() => {
    if (guiDebugger) {
      const existingFolder = guiDebugger.folders.find((folder) => {
        return folder._title === LIGHTS_DEBUG_ITEM.LIGHTS;
      });

      const lightsFolder = existingFolder ||
        guiDebugger.addFolder(LIGHTS_DEBUG_ITEM.LIGHTS).open();

      existingFolder?.controllers.find((controller) => {
        return controller._name === LIGHTS_DEBUG_ITEM.HELPERS;
      }) || lightsFolder.add(debugObject, 'enableLightHelpers')
          .name(LIGHTS_DEBUG_ITEM.HELPERS)
          .onChange((bool) => setEnableLightHelpers(bool),
          );

    //   lights.map((light, index) => {
    //     const numberedLightFolder =
      //     `${LIGHTS_DEBUG_ITEM.LIGHT}: ${index + 1}`;
    //
    //     const existingFolder = guiDebugger.folders.find((folder) => {
    //       return folder._title === LIGHTS_DEBUG_ITEM.LIGHTS;
    //     });
    //
    //     const existingSubFolder = existingFolder.children.find((folder) => {
    //       return folder._title === numberedLightFolder;
    //     });
    //
    //     const lightsFolder = existingFolder ||
    //     guiDebugger.addFolder(LIGHTS_DEBUG_ITEM.LIGHTS).open();
    //
    //     const lightSubFolder = existingSubFolder ||
    //     lightsFolder.addFolder(numberedLightFolder).open();
    //
    //     existingSubFolder?.controllers.find((controller) => {
    //       return controller._name === LIGHTS_DEBUG_ITEM.COLOR;
    //     }) || lightSubFolder.addColor(
      //     debugColorObject.colors[index], 'color')
    //         .name(LIGHTS_DEBUG_ITEM.COLOR)
    //         .onChange((newColor) => {
    //           return setLights((state) => {
    //             return [
    //               ...state,
    //               light.color = newColor,
    //             ];
    //           });
    //         });
    //   });
    }
  }, []);

  return (
    <>
      <ambientLight
        color={0x0000FF}
        intensity={3}
      />
      {
        lights.map((light, index) => {
          const { color, intensity, distance, x, y, z } = light;

          const lightRef = useRef();
          useHelper(
              debugObject.enableLightHelpers && lightRef,
              PointLightHelper,
              1,
              color,
          );

          return (
            <pointLight
              key={`Light ${light.color}: ${light.x}, ${light.y}, ${light.z}`}
              ref={lightRef}
              color={color}
              intensity={intensity}
              distance={distance}
              position={[x, y, z]}
            />
          );
        })
      }
    </>
  );
};
