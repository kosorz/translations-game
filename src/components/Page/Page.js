import { Page as Root } from "grommet";
import React from 'react'

export const Page = ({ children }) => (
  <Root pad="small" direction="row">
    {children}
  </Root>
);
