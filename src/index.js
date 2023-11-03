import React, { useState } from "react";
import ReactDOM from "react-dom";
import { polishGermanConfig } from "./configs/polish-german";
import { Wizard } from "./components/Wizard/Wizard";
import { grommet, Grommet } from "grommet";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { polishEnglishConfig } from "./configs/polish-english";
import { Dashboard } from "./components/Dashboard/Dashboard";

const router = ({ setTheme, setMode, mode, theme }) =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <Dashboard
          setMode={setMode}
          mode={mode}
          setTheme={setTheme}
          theme={theme}
        />
      ),
    },
    {
      path: "/polish-german",
      element: (
        <Wizard
          baseLanguage="polish"
          aimLanguage="german"
          config={polishGermanConfig}
          setTheme={setTheme}
          theme={theme}
          setMode={setMode}
          mode={mode}
        />
      ),
    },
    {
      path: "/german-polish",
      element: (
        <Wizard
          baseLanguage="german"
          aimLanguage="polish"
          config={polishGermanConfig}
          setTheme={setTheme}
          theme={theme}
          setMode={setMode}
          mode={mode}
        />
      ),
    },
    {
      path: "/polish-english",
      element: (
        <Wizard
          questions={5}
          aimLanguage="english"
          baseLanguage="polish"
          config={polishEnglishConfig}
          setTheme={setTheme}
          theme={theme}
          setMode={setMode}
          mode={mode}
        />
      ),
    },
    {
      path: "/english-polish",
      element: (
        <Wizard
          questions={5}
          aimLanguage="polish"
          baseLanguage="english"
          config={polishEnglishConfig}
          setTheme={setTheme}
          theme={theme}
          setMode={setMode}
          mode={mode}
        />
      ),
    },
  ]);

const Root = styled(Grommet)({
  minHeight: "100%",
});

export const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [mode, setMode] = useState("training");

  return (
    <Root
      theme={{
        ...grommet,
        global: {
          ...grommet.global,
          colors: { background: { dark: "#1b1e25", light: "#f4f4f4" } },
        },
      }}
      themeMode={theme}
    >
      <React.StrictMode>
        <RouterProvider
          router={router({ setTheme, theme, mode, setMode })}
        />
      </React.StrictMode>
    </Root>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
