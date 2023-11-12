import { Page as Root } from "grommet";
import React from "react";

export const Page = ({ children, direction = 'row' }) => (
  <Root pad="medium" direction={direction}>
    {children}
  </Root>
);
