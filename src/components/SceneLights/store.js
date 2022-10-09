import { atom } from 'recoil';

export const sceneLightsState = atom({
  key: 'sceneLights',
  default: [
    { color: 0xf100ff, intensity: 6, distance: 12, x: 1, y: 0, z: 10 },
    { color: 0xc56cef, intensity: 6, distance: 12, x: -2, y: 1, z: -10 },
    { color: 0x0000FF, intensity: 3, distance: 10, x: 0, y: 10, z: 1 },
    { color: 0x00ffdd, intensity: 6, distance: 12, x: 0, y: -10, z: -1 },
    { color: 0x16a7f5, intensity: 6, distance: 12, x: 10, y: 3, z: 0 },
    { color: 0x0000FF, intensity: 6, distance: 12, x: -10, y: -1, z: 0 },
  ],
});

export const lightsDebugState = atom({
  key: 'lightsDebug',
  default: true,
});
