import { Box } from "grommet";
import styled from "styled-components";
import { Button } from "grommet";

export const Root = styled(Box)({
  alignItems: "center",
});

Root.defaultProps = {
  display: "flex",
  direction: "row",
  justify: "between",
  pad: {
    right: "medium",
    left: "medium",
    top: "small",
    bottom: "small",
  },
};

export const Divider = styled(Box)({});

Divider.defaultProps = {
  border: {
    size: "medium",
    side: "top",
  },
  pad: {
    bottom: "medium",
  },
};

export const LogoFrame = styled(Box)({
  borderRadius: "50%",
  minHeight: 46,
  minWidth: 46,

  '&:active': {
    boxShadow: '0 0 2px 2px #6FFFB0'
  }
});

LogoFrame.defaultProps = {
  border: {
    size: "small",
  },
};

export const Logo = styled(Button)({
  padding: 8,
});

export const Switches = styled(Box)({
  gap: 8,
});

Switches.defaultProps = {
  direction: "row",
  display: "flex",
};
