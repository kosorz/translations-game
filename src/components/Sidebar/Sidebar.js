import React from "react";
import * as S from "./Sidebar.styles";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";

export const Sidebar = ({ children, setTheme, theme }) => (
  <S.Root header={<ThemeSwitch setTheme={setTheme} theme={theme} />}>
    {children}
  </S.Root>
);
