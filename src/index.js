import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Wizard } from "./components/Wizard/Wizard";
import { grommet, Grommet } from "grommet";
import styled from "styled-components";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { polishEnglishData } from "./data/polish-english";
import { polishGermanData } from "./data/polish-german";
import { Dashboard } from "./components/Dashboard/Dashboard";
import "./locales/i18n";
import * as Sentry from "@sentry/react";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import i18n from "i18next";

const LangWrapper = ({ children }) => {
  let { lang } = useParams();

  useEffect(() => {
    const isSupportedLanguage = ["en", "de", "pl"].includes(lang);

    if (isSupportedLanguage && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return children;
};

const PolishGermanWizard = (props) => (
  <Wizard
    {...props}
    baseLanguage="polish"
    aimLanguage="german"
    config={polishGermanData}
  />
);

const GermanPolishWizard = (props) => (
  <Wizard
    {...props}
    baseLanguage="german"
    aimLanguage="polish"
    config={polishGermanData}
  />
);

const PolishEnglishWizard = (props) => (
  <Wizard
    {...props}
    aimLanguage="english"
    baseLanguage="polish"
    config={polishEnglishData}
  />
);

const EnglishPolishWizard = (props) => (
  <Wizard
    {...props}
    aimLanguage="polish"
    baseLanguage="english"
    config={polishEnglishData}
  />
);

const router = (props) =>
  createBrowserRouter([
    {
      path: "/:lang",
      children: [
        {
          index: true,
          element: (
            <LangWrapper>
              <Dashboard {...props} />
            </LangWrapper>
          ),
        },
        {
          path: "polish-german",
          exact: true,
          element: (
            <LangWrapper>
              <PolishGermanWizard {...props} />
            </LangWrapper>
          ),
        },
        {
          path: "polish-german/:category",
          element: (
            <LangWrapper>
              <PolishGermanWizard {...props} />
            </LangWrapper>
          ),
        },
        {
          path: "german-polish",
          exact: true,
          element: (
            <LangWrapper>
              <GermanPolishWizard {...props} />
            </LangWrapper>
          ),
        },
        {
          path: "german-polish/:category",
          element: (
            <LangWrapper>
              <GermanPolishWizard {...props} />
            </LangWrapper>
          ),
        },
        {
          path: "polish-english",
          exact: true,
          element: (
            <LangWrapper>
              <PolishEnglishWizard {...props} />
            </LangWrapper>
          ),
        },
        {
          path: "polish-english/:category",
          element: (
            <LangWrapper>
              <PolishEnglishWizard {...props} />
            </LangWrapper>
          ),
        },
        {
          path: "english-polish",
          exact: true,
          element: (
            <LangWrapper>
              <EnglishPolishWizard {...props} />
            </LangWrapper>
          ),
        },
        {
          path: "english-polish/:category",
          element: (
            <LangWrapper>
              <EnglishPolishWizard {...props} />
            </LangWrapper>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to={`/${localStorage.getItem("lang") || "en"}`} />,
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

Sentry.init({
  dsn: "https://7bddf6b097ddd9e58c9c3803adcb36b8@o4508392570421248.ingest.de.sentry.io/4508392572387408",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0,
  tracePropagationTargets: ["localhost"],
});

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
