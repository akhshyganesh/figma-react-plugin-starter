export interface MessageFromUIToPlugin {
  type: 'ui-ready' | 'create-rectangle' | 'close';
}

export interface MessageFromPluginToUI {
  type: 'selectionChange';
  selectionCount: number;
}
