import React from "react";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";
import * as S from "./Header.styles";
import { Language } from "grommet-icons";

export const Header = ({ theme, setTheme }) => (
  <>
    <S.Root>
      <S.LogoFrame>
        <S.Logo
          icon={<Language size="medium" />}
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
