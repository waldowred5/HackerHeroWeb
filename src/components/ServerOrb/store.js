import { atom, selector } from 'recoil';

export const serverOrbPropsState = atom({
  key: 'vertexObject',
  default: {
    radius: 2,
  },
});

export const vertexNumberState = atom({
  key: 'vertexNumber',
  default: 50,
});

// TODO Rename this...
export const nodesState = selector({
  key: 'nodes',
  get: ({ get }) => {
    return Array.from(Array(get(vertexNumberState)));
  },
});

export const lineDrawThresholdPercentageState = atom({
  key: 'lineDrawThresholdPercentage',
  default: 0.6,
});

export const vertexPlacementChaosFactorState = atom({
  key: 'vertexPlacementChaosFactor',
  default: 420,
});

export const vertexPointsState = atom({
  key: 'vertexPoints',
  default: { coords: [], vectors: [] },
});

export const verticesState = atom({
  key: 'vertices',
  default: [],
});
