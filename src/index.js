import React, { useState } from "react";
import ReactDOM from "react-dom";
import { polishGermanConfig } from "./configs/polish-german";
import { GuidedWizard, Wizard } from "./components/Wizard/Wizard";
import { grommet, Grommet } from "grommet";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { polishEnglishConfig } from "./configs/polish-english";
import { Dashboard } from "./components/Dashboard/Dashboard";

const router = ({ setTheme, theme }) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Dashboard setTheme={setTheme} theme={theme} />,
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
        />
      ),
    },
    {
      path: "/polish-english",
      element: (
        <Wizard
          aimLanguage="english"
          baseLanguage="polish"
          config={polishEnglishConfig}
          setTheme={setTheme}
          theme={theme}
        />
      ),
    },
    {
      path: "/english-polish",
      element: (
        <Wizard
          aimLanguage="polish"
          baseLanguage="english"
          config={polishEnglishConfig}
          setTheme={setTheme}
          theme={theme}
        />
      ),
    },
  ]);

const Root = styled(Grommet)({
  minHeight: "100%",
});

export const ThemeProvider = ({ children, theme }) => {
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
      {children}
    </Root>
  );
};

export const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  return (
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <RouterProvider router={router({ setTheme, theme })} />
      </React.StrictMode>
    </ThemeProvider>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
