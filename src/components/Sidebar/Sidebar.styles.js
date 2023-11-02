import styled from "styled-components";
import { Sidebar } from "grommet";

export const Root = styled(Sidebar)({
  flexShrink: 0,
});

Sidebar.defaultProps = {
  pad: {
    right: 'medium',
  }
}
