import React from "react";
import * as S from "./Sidebar.styles";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";
import { ConditionSwitch } from "../ConditionSwitch/ConditionSwitch";

export const Sidebar = ({
  children,
  setTheme,
  condition,
  setCondition,
  theme,
}) => (
  <S.Root
    header={<ThemeSwitch setTheme={setTheme} theme={theme} />}
    footer={
      <ConditionSwitch condition={condition} setCondition={setCondition} />
    }
  >
    {children}
  </S.Root>
);
