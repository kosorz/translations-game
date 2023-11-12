import { Box, Button } from "grommet";
import styled from "styled-components";

export const Tile = styled(Button)({
  borderRadius: 12,
});

export const Category = styled(Button)({
  borderRadius: "11px",

  "@media (max-width: 768px)": {
    borderRadius: "6px",
  },
});

Category.defaultProps = {
  primary: "true",
  color: "neutral-3",
  margin: { bottom: 'xsmall' },
};

export const Categories = styled(Box)({});

Categories.defaultProps = {
  gap: "small",
  round: "small",
};
