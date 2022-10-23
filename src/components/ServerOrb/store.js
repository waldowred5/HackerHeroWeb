import { atom, selector } from 'recoil';
import { DEBUG_GRAPH_ITEM } from '../../utils/constants';

export const serverOrbPropsState = atom({
  key: 'vertexObject',
  default: {
    radius: 2,
  },
});

export const vertexNumberState = atom({
  key: 'vertexNumber',
  default: 28,
});

export const verticesInitState = selector({
  key: 'verticesInit',
  get: ({ get }) => {
    return Array.from(Array(get(vertexNumberState)));
  },
});

export const lineDrawThresholdPercentageState = atom({
  key: 'lineDrawThresholdPercentage',
  default: 0.77,
});

export const vertexPlacementChaosFactorState = atom({
  key: 'vertexPlacementChaosFactor',
  default: 350,
});

export const vertexPointsState = atom({
  key: 'vertexPoints',
  default: { coords: [], vectors: [] },
});

export const verticesState = atom({
  key: 'vertices',
  default: [],
});

export const nodesState = atom({
  key: 'nodes',
  default: [],
});

export const serverOrbDebugState = atom({
  key: 'serverOrbDebug',
  default: [
    {
      controllerName: DEBUG_GRAPH_ITEM.VERTEX_NUMBER,
      folderTitle: DEBUG_GRAPH_ITEM.GRAPH,
      debugObjectItemName: 'vertexNumber',
      min: 1,
      max: 150,
      step: 1,
    },
    {
      controllerName: DEBUG_GRAPH_ITEM.VERTEX_PLACEMENT_CHAOS_MODIFIER,
      folderTitle: DEBUG_GRAPH_ITEM.GRAPH,
      debugObjectItemName: 'vertexPlacementChaosFactor',
      min: 0.1,
      max: 900,
      step: 0.1,
    },
    {
      controllerName: DEBUG_GRAPH_ITEM.LINE_DRAW_THRESHOLD_PERCENTAGE,
      folderTitle: DEBUG_GRAPH_ITEM.GRAPH,
      debugObjectItemName: 'lineDrawThresholdPercentage',
      min: 0.01,
      max: 1,
      step: 0.01,
    },
  ],
});
