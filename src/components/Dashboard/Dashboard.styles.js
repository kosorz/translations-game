import { Box, Button } from "grommet";
import styled from "styled-components";

export const Category = styled(Button)({
  borderRadius: 6,
});

Category.defaultProps = {
  primary: "true",
  color: "brand",
  margin: { bottom: "xsmall" },
};

export const Categories = styled(Box)({});

Categories.defaultProps = {
  gap: "xsmall",
  round: "small",
  direction: "row",
  margin: { vertical: "large" },
  justify: "start",
  wrap: true,
};
