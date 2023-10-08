import styled from "styled-components";
import { Box, Button, Heading, Paragraph, Sidebar, Nav} from "grommet";

export const Progress = styled(Paragraph)({
  margin: 0,
  textAlign: "left",
  color: "gray",
});

export const Main = styled(Box)({
  flexGrow: 1,
  textAlign: "center",
});

Main.defaultProps = {
  border: { color: "brand", size: "large" },
  pad: "medium",
  elevation: "big",
  round: true,
  responsive: true,
};

export const Center = styled(Box)({
  flexGrow: 1,
});

Center.defaultProps = {
  align: "center",
};

export const Word = styled(Heading)(({ revealed }) => ({
  paddingBottom: revealed ? 0 : "24px",
}));

Word.defaultProps = {
  level: 2,
  responsive: true,
  textAlign: "center",
  weight: "bold",
};

export const Answer = styled(Heading)({
  margin: 0,
});

Answer.defaultProps = {
  color: "gray",
  level: 4,
};

export const Control = styled(Box)({});

Control.defaultProps = {
  direction: "row",
  gap: "2px",
};

export const Score = styled(Heading)({});

Score.defaultProps = {
  level: 1,
  color: "brand",
};

export const Actions = styled(Box)({
  marginTop: "16px",
});

export const RedoSet = styled(Button)({
  marginTop: "8px",
  border: "none",
});

export const NewSet = styled(Button)({
  marginTop: "8px",
  minWidth: 200,
});

NewSet.defaultProps = {
  primary: true,
};

export const Badge = styled(Heading)({});

Badge.defaultProps = {
  level: 1,
};

export const Encouragement = styled(Heading)({});

Encouragement.defaultProps = {
  level: 3,
};

export const EncouragementLong = styled(Paragraph)({});

export const Categories = styled(Sidebar)({
  flexShrink: 0,
  paddingLeft: 0,
});

Categories.defaultProps = {
  round: "small",
};

export const Navigation = styled(Nav)({});

Navigation.defaultProps = {
  gap: "small",
  background: "brand",
  round: "small",
};
