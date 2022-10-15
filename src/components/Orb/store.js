import { atom } from 'recoil';
import { DEBUG_ORB_ITEM } from '../../utils/constants';

export const orbPropsState = atom({
  key: 'orbProps',
  default: {
    opacity: 0.8,
    scale: 1.8,
  },
});

export const orbDebugState = atom({
  key: 'orbDebug',
  default: [
    {
      controllerName: DEBUG_ORB_ITEM.SCALE,
      folderTitle: DEBUG_ORB_ITEM.ORB,
      debugObjectItemName: 'scale',
      min: 0,
      max: 2.5,
      step: 0.1,
    },
    {
      controllerName: DEBUG_ORB_ITEM.OPACITY,
      folderTitle: DEBUG_ORB_ITEM.ORB,
      debugObjectItemName: 'opacity',
      min: 0,
      max: 1,
      step: 0.01,
    },
  ],
});
