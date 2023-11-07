import React, { useState } from "react";
import ReactDOM from "react-dom";
import { polishGermanConfig } from "./configs/polish-german";
import { Wizard } from "./components/Wizard/Wizard";
import { grommet, Grommet } from "grommet";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { polishEnglishConfig } from "./configs/polish-english";
import { Dashboard } from "./components/Dashboard/Dashboard";

const PolishGermanWizard = (props) => (
  <Wizard
    {...props}
    baseLanguage="polish"
    aimLanguage="german"
    config={polishGermanConfig}
  />
);

const GermanPolishWizard = (props) => (
  <Wizard
    {...props}
    baseLanguage="german"
    aimLanguage="polish"
    config={polishGermanConfig}
  />
);

const PolishEnglishWizard = (props) => (
  <Wizard
    {...props}
    aimLanguage="english"
    baseLanguage="polish"
    config={polishEnglishConfig}
  />
);

const EnglishPolishWizard = (props) => (
  <Wizard
    {...props}
    aimLanguage="polish"
    baseLanguage="english"
    config={polishEnglishConfig}
  />
);

const router = ({ setTheme, theme }) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Dashboard setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/polish-german",
      element: <PolishGermanWizard setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/polish-german/:category",
      element: <PolishGermanWizard setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/german-polish",
      element: <GermanPolishWizard setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/german-polish/:category",
      element: <GermanPolishWizard setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/polish-english",
      element: <PolishEnglishWizard setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/polish-english/:category",
      element: <PolishEnglishWizard setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/english-polish",
      element: <EnglishPolishWizard setTheme={setTheme} theme={theme} />,
    },
    {
      path: "/english-polish/:category",
      element: <EnglishPolishWizard setTheme={setTheme} theme={theme} />,
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
