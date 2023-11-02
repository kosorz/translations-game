import { Page as Root } from "grommet";
import React from "react";

export const Page = ({ children }) => (
  <Root pad="medium" direction="row">
    {children}
  </Root>
);
