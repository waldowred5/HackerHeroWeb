import { atom } from 'recoil';

export const orbPropsState = atom({
  key: 'orbProps',
  default: {
    opacity: 0.4,
    scale: 1.9,
  },
});
