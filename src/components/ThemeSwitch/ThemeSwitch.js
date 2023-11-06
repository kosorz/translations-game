import React from "react";
import { Box } from "grommet";
import { Sun, Moon } from "grommet-icons";
import { Switch } from "../Switch/Switch";

export const ThemeSwitch = ({ setTheme, theme }) => {
  const saveTheme = (theme) => {
    const styleTag = document.getElementById("tourArrowColor");
    styleTag.textContent = `
      .__floater__arrow polygon { fill: ${
        theme === "dark" ? "#333" : "white"
      }; }
  `;
    localStorage.setItem("theme", theme);
  };

  return (
    <Box>
      <Switch
        config={[
          {
            icon: Sun,
            active: theme === "light",
            onClick: (e) => {
              setTheme("light");
              saveTheme("light");
            },
          },
          {
            icon: Moon,
            active: theme === "dark",
            onClick: (e) => {
              setTheme("dark");
              saveTheme("dark");
            },
          },
        ]}
      />
    </Box>
  );
};
