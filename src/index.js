import React from "react";
import ReactDOM from "react-dom";
import { germanEnglishConfig } from "./configs/german-english";
import { Wizard } from "./components/Wizard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { polishEnglishConfig } from "./configs/polish-english";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Wizard
        baseLanguage="english"
        aimLanguage="german"
        config={germanEnglishConfig}
      />
    ),
  },
  {
    path: "/english-german",
    element: (
      <Wizard
        baseLanguage="english"
        aimLanguage="german"
        config={germanEnglishConfig}
      />
    ),
  },
  {
    path: "/german-english",
    element: (
      <Wizard
        baseLanguage="german"
        aimLanguage="english"
        config={germanEnglishConfig}
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
      />
    ),
  },
]);

export const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
