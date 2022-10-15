import React, { useEffect, useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { PointLightHelper } from 'three';
import { useRecoilState, useRecoilValue } from 'recoil';
import { lightsDebugState, sceneLightsState } from './store';
import { addDebugItemCheckbox, guiDebugger } from 'utils/guiDebugger';

export const SceneLights = () => {
  const lights = useRecoilValue(sceneLightsState);

  const [
    {
      enableLightHelpers,
      enableLights,
      debugItems,
    },
    setEnableLightHelpers,
  ] = useRecoilState(lightsDebugState);

  // Debug
  useEffect(() => {
    if (guiDebugger) {
      const debugObject = {
        enableLightHelpers,
        enableLights,
        lights,
      };

      const debugChangeFunctions = [
        (bool) => setEnableLightHelpers((state) => {
          return {
            ...state,
            enableLightHelpers: bool,
          };
        }),
        (bool) => setEnableLightHelpers((state) => {
          return {
            ...state,
            enableLights: bool,
          };
        }),
      ];

      debugItems.map((debugItem, index) => {
        addDebugItemCheckbox({
          changeFunction: debugChangeFunctions[index],
          controllerName: debugItem.controllerName,
          debugObject,
          debugObjectItemName: debugItem.debugObjectItemName,
          folderTitle: debugItem.folderTitle,
        });
      });

      // TODO Finish creating color changer debugger
    //   lights.map((light, index) => {
    //     const numberedLightFolder =
      //     `${DEBUG_LIGHTS_ITEM.LIGHT}: ${index + 1}`;
    //
    //     const existingFolder = guiDebugger.folders.find((folder) => {
    //       return folder._title === DEBUG_LIGHTS_ITEM.LIGHTS;
    //     });
    //
    //     const existingSubFolder = existingFolder.children.find((folder) => {
    //       return folder._title === numberedLightFolder;
    //     });
    //
    //     const lightsFolder = existingFolder ||
    //     guiDebugger.addFolder(DEBUG_LIGHTS_ITEM.LIGHTS).open();
    //
    //     const lightSubFolder = existingSubFolder ||
    //     lightsFolder.addFolder(numberedLightFolder).open();
    //
    //     existingSubFolder?.controllers.find((controller) => {
    //       return controller._name === DEBUG_LIGHTS_ITEM.COLOR;
    //     }) || lightSubFolder.addColor(
      //     debugColorObject.colors[index], 'color')
    //         .name(DEBUG_LIGHTS_ITEM.COLOR)
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
  }, [enableLights]);

  return (
    <>
      <ambientLight
        color={0xFFFFFF}
        intensity={0.3}
      />
      {
        lights.map((light) => {
          const { color, intensity, distance, x, y, z } = light;

          const lightRef = useRef();
          useHelper(
              enableLightHelpers && lightRef,
              PointLightHelper,
              1,
              color,
          );

          return (
            enableLights && <pointLight
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
