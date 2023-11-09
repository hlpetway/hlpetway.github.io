import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Box, ColorSchemeProvider } from "gestalt";

const html = document.querySelector("html");
html.setAttribute("dir", "ltr");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColorSchemeProvider colorScheme="dark" fullDimensions>
      <Box color="default" height="100%" width="100%">
        <App />
      </Box>
    </ColorSchemeProvider>
  </React.StrictMode>
);
