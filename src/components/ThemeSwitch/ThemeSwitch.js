import React from "react";
import * as S from './ThemeSwitch.styles'
import { Box } from 'grommet'
import { Sun, Moon } from 'grommet-icons'

export const ThemeSwitch = ({ setTheme, theme }) => (
  <Box>
    <S.Option
      onClick={() => setTheme("light")}
      active={theme === "light"}
      icon={<Sun />}
    />
    <S.Option
      onClick={() => setTheme("dark")}
      active={theme === "dark"}
      icon={<Moon />}
    />
  </Box>
);
