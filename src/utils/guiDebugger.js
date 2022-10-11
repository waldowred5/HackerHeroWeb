import * as dat from 'lil-gui';

export const guiDebugger = window.location.hash === '#debug' &&
  new dat.GUI({ width: 400 });
