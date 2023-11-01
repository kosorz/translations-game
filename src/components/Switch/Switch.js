import React from "react";
import * as S from "./Switch.styles";
import { Box } from "grommet";

export const Switch = ({ config }) => (
  <Box>
    <S.Option
      onClick={config[0].onClick}
      active={config[0].active}
      icon={config[0].icon}
    />
    <S.Option
      onClick={config[1].onClick}
      active={config[1].active}
      icon={config[1].icon}
    />
  </Box>
);
