import * as ReactDOM from 'react-dom/client';

import App from './App';

window.onload = () => {
  const node = document.getElementById('root') as HTMLElement;
  ReactDOM.createRoot(node).render(<App />);
};
