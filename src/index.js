import React, { useState } from "react";
import ReactDOM from "react-dom";
import { polishGermanConfig } from "./configs/polish-german";
import { Wizard } from "./components/Wizard/Wizard";
import { grommet, Grommet } from "grommet";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { polishEnglishConfig } from "./configs/polish-english";
import { Dashboard } from "./components/Dashboard/Dashboard";

const router = ({ setTheme, setCondition, condition, theme }) =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <Dashboard
          setCondition={setCondition}
          condition={condition}
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
          setCondition={setCondition}
          condition={condition}
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
          setCondition={setCondition}
          condition={condition}
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
          setCondition={setCondition}
          condition={condition}
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
          setCondition={setCondition}
          condition={condition}
        />
      ),
    },
  ]);

const Root = styled(Grommet)({
  minHeight: "100%",
});

export const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [condition, setCondition] = useState(
    localStorage.getItem("condition") || "view"
  );

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
          router={router({ setTheme, theme, condition, setCondition })}
        />
      </React.StrictMode>
    </Root>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
