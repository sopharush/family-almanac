import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/playfair-display';
import '@fontsource-variable/playfair-display/wght-italic.css';
import '@fontsource-variable/montserrat';
import '@fontsource/dancing-script/600.css';
import './index.css';
import { MOTION_OFF } from './lib/motion';
import App from './App';

if (MOTION_OFF) document.documentElement.classList.add('motion-off');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
