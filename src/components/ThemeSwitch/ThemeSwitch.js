import React from "react";
import { Box } from "grommet";
import { Sun, Moon } from "grommet-icons";
import { Switch } from "../Switch/Switch";

export const ThemeSwitch = ({ setTheme, theme }) => {
  const saveTheme = (theme) => {
    localStorage.setItem("theme", theme);
  };

  return (
    <Box>
      <Switch
        config={[
          {
            icon: <Sun />,
            active: theme === "light",
            onClick: () => {
              setTheme("light");
              saveTheme("light");
            },
          },
          {
            icon: <Moon />,
            active: theme === "dark",
            onClick: () => {
              setTheme("dark");
              saveTheme("dark");
            },
          },
        ]}
      />
    </Box>
  );
};
