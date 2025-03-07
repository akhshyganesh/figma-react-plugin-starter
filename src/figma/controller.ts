/// <reference types="@figma/plugin-typings" />

import { MessageFromPluginToUI, MessageFromUIToPlugin } from './types';

figma.showUI(__html__, { width: 300, height: 400 });

figma.on('selectionchange', () => {
  figma.ui.postMessage({
    type: 'selectionChange',
    selectionCount: figma.currentPage.selection.length,
  } as MessageFromPluginToUI);
});

figma.ui.onmessage = (msg: MessageFromUIToPlugin) => {
  if (msg.type === 'ui-ready') {
    figma.ui.postMessage({
      type: 'selectionChange',
      selectionCount: figma.currentPage.selection.length,
    } as MessageFromPluginToUI);
  }

  if (msg.type === 'create-rectangle') {
    const rect = figma.createRectangle();
    rect.x = figma.viewport.center.x - 50;
    rect.y = figma.viewport.center.y - 50;
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    rect.resize(100, 100);
    figma.currentPage.selection = [rect];
  }
};
