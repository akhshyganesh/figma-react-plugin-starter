import React, { useEffect, useState } from 'react';
import { MessageFromPluginToUI, MessageFromUIToPlugin } from '../figma/types';

function App() {
  const [selection, setSelection] = useState<string>('No selection');

  useEffect(() => {
    // Listen for messages from the Figma plugin controller
    window.onmessage = event => {
      const message = event.data.pluginMessage as MessageFromPluginToUI;

      if (message.type === 'selectionChange') {
        setSelection(
          message.selectionCount > 0
            ? `${message.selectionCount} layer(s) selected`
            : 'No selection'
        );
      }
    };

    // Initial setup - tell the controller we're ready
    parent.postMessage(
      {
        pluginMessage: { type: 'ui-ready' } as MessageFromUIToPlugin,
      },
      '*'
    );
  }, []);

  const onCreateRectangle = () => {
    parent.postMessage(
      {
        pluginMessage: { type: 'create-rectangle' } as MessageFromUIToPlugin,
      },
      '*'
    );
  };

  return (
    <div className="app">
      <h2>Figma React Plugin</h2>
      <p>{selection}</p>
      <button onClick={onCreateRectangle}>Create Rectangle</button>
    </div>
  );
}

export default App;
