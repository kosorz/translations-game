import React from "react";
import * as S from "./ThemeSwitch.styles";
import { Box } from "grommet";
import { Sun, Moon } from "grommet-icons";

export const ThemeSwitch = ({ setTheme, theme }) => {
  const saveTheme = (theme) => {
    localStorage.setItem("theme", theme);
  };

  return (
    <Box>
      <S.Option
        onClick={() => {
          setTheme("light");
          saveTheme("light");
        }}
        active={theme === "light"}
        icon={<Sun />}
      />
      <S.Option
        onClick={() => {
          setTheme("dark");
          saveTheme("dark");
        }}
        active={theme === "dark"}
        icon={<Moon />}
      />
    </Box>
  );
};
