import styled from "styled-components";
import { Box, Button } from "grommet";

export const Option = styled(Button)({
  borderRadius: 18,
  padding: 8,
});

export const Root = styled(Box)({
  borderRadius: 21,
  padding: 3,
});

Root.defaultProps = {
  border: { size: "small" },
  direction: "row",
  display: "flex",
};
