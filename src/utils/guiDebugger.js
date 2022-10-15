import * as dat from 'lil-gui';

export const guiDebugger = window.location.hash === '#debug' &&
  new dat.GUI({ width: 400 });

export const addDebugItemSlider = ({
  changeFunction,
  controllerName,
  debugObject,
  debugObjectItemName,
  folderTitle,
  min,
  max,
  step,
}) => {
  const existingFolder = guiDebugger.folders.find((folder) => {
    return folder._title === folderTitle;
  });

  const folderToModify = existingFolder ||
    guiDebugger.addFolder(folderTitle).open();

  existingFolder?.controllers.find((controller) => {
    return controller._name === controllerName;
  }) || folderToModify.add(debugObject, `${debugObjectItemName}`)
      .name(controllerName)
      .min(min)
      .max(max)
      .step(step)
      .onChange(changeFunction);
};

export const addDebugItemCheckbox = ({
  changeFunction,
  controllerName,
  debugObject,
  debugObjectItemName,
  folderTitle,
}) => {
  const existingFolder = guiDebugger.folders.find((folder) => {
    return folder._title === folderTitle;
  });

  const folderToModify = existingFolder ||
    guiDebugger.addFolder(folderTitle).open();

  existingFolder?.controllers.find((controller) => {
    return controller._name === controllerName;
  }) || folderToModify.add(debugObject, `${debugObjectItemName}`)
      .name(controllerName)
      .onChange(changeFunction);
};
