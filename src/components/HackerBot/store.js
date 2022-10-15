import { atom } from 'recoil';

export const hackerBotListState = atom({
  key: 'hackerBotList',
  default: [],
});

export const hackerBotPropsState = atom({
  key: 'hackerBotProps',
  default: {
    radius: 0.18,
  },
});

