import { CssBaseline } from "@mui/material";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConfigureDevices from "./pages/ConfigureDevices";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";

interface Props {}
type ColorMode = "light" | "dark";
const App = (props: Props) => {
  const [mode, setMode] = React.useState<ColorMode>(
    (localStorage.getItem("colorMode") as ColorMode) || "light"
  );

  const onThemeUpdate = (color: "light" | "dark") => {
    setMode(color);
    localStorage.setItem("colorMode", color);
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <Navigation onUpdateTheme={onThemeUpdate} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/configure" element={<ConfigureDevices />} />
            <Route
              path="*"
              element={
                <p style={{ display: "flex", justifyContent: "center" }}>
                  404 not found!
                </p>
              }
            />
          </Routes>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
