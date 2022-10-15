import { atom } from 'recoil';
import { DEBUG_LIGHTS_ITEM } from '../../utils/constants';

export const sceneLightsState = atom({
  key: 'sceneLights',
  default: [
    // { color: 0xf100ff, intensity: 6, distance: 12, x: 1, y: 0, z: 10 },
    // { color: 0xc56cef, intensity: 6, distance: 12, x: -2, y: 1, z: -10 },
    // { color: 0xc56cef, intensity: 5, distance: 10, x: 0, y: 10, z: 1 },
    // { color: 0x00ffdd, intensity: 8, distance: 12, x: 0, y: -10, z: -1 },
    // { color: 0x16a7f5, intensity: 6, distance: 12, x: 10, y: 3, z: 0 },
    // { color: 0x0095ff, intensity: 6, distance: 12, x: -10, y: -1, z: 0 },
    { color: 0xFFFFFF, intensity: 6, distance: 12, x: 1, y: 0, z: 10 },
    { color: 0xFFFFFF, intensity: 5, distance: 12, x: -2, y: 1, z: -10 },
    { color: 0xFFFFFF, intensity: 4, distance: 10, x: 0, y: 10, z: 1 },
    { color: 0xFFFFFF, intensity: 6, distance: 12, x: 0, y: -10, z: -1 },
    { color: 0xFFFFFF, intensity: 5, distance: 12, x: 10, y: 3, z: 0 },
    { color: 0xFFFFFF, intensity: 4, distance: 12, x: -10, y: -1, z: 0 },
  ],
});

export const lightsDebugState = atom({
  key: 'lightsDebug',
  default: {
    enableLightHelpers: false,
    enableLights: true,
    debugItems: [
      {
        controllerName: DEBUG_LIGHTS_ITEM.SHOW_LIGHT_HELPERS,
        folderTitle: DEBUG_LIGHTS_ITEM.LIGHTS,
        debugObjectItemName: 'enableLightHelpers',
      },
      {
        controllerName: DEBUG_LIGHTS_ITEM.SHOW_LIGHTS,
        folderTitle: DEBUG_LIGHTS_ITEM.LIGHTS,
        debugObjectItemName: 'enableLights',
      },
    ],
  },
});
