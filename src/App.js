import React from "react";
import { ThemeProvider } from "styled-components";
import styleTheme from "./styles/theme";
// config
// import themeColors from "config/themeColors";
// components
import Layout from "./Components/Layout";

// main
function App() {
  // disable right click
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  return (
    <ThemeProvider theme={styleTheme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
