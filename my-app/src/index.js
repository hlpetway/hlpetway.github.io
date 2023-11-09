import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Box, ColorSchemeProvider } from "gestalt";
import App from "./App";

const html = document.querySelector("html");
html.setAttribute("dir", "ltr");

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ColorSchemeProvider colorScheme="light" fullDimensions>
      <Box color="default" height="100%" width="100%">
        <App />
      </Box>
    </ColorSchemeProvider>
  </StrictMode>
);