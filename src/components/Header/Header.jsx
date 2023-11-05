import React from "react";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";
import * as S from "./Header.styles";

export const Header = ({ theme, setTheme }) => (
  <>
    <S.Root>
      <S.LogoFrame>
        <S.Logo
          icon={<img alt="logo" src='/logo.svg' width={26} />}
          pad="small"
          href={"/"}
          hoverIndicator
        />
        
      </S.LogoFrame>
      <S.Switches>
        {<ThemeSwitch setTheme={setTheme} theme={theme} />}
      </S.Switches>
    </S.Root>
    <S.Divider />
  </>
);
