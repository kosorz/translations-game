import styled from "styled-components";
import { Box, Button, Heading, Paragraph, Nav } from "grommet";
import { Star as StarBase } from "grommet-icons";

export const Progress = styled(Paragraph)({
  margin: 0,
  textAlign: "left",
  color: "gray",
});

export const Main = styled(Box)({
  textAlign: "center",
});

Main.defaultProps = {
  border: { color: "brand", size: "large" },
  pad: "medium",
  elevation: "big",
  round: true,
  responsive: true,
  justify: "between",
};

export const Center = styled(Box)({
  flexGrow: 1,
  paddingRight: 6,
  paddingLeft: 6,
  paddingTop: 6,
});

Center.defaultProps = {
  align: "center",
};

export const Word = styled(Heading)(({ revealed }) => ({
  paddingBottom: revealed ? 0 : "24px",

  "@media (max-width: 768px)": {
    paddingBottom: revealed ? 0 : "22px",
  },
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

export const ProgressScore = styled(Progress)({
  display: "flex",
  alignItems: "center",
});

export const Score = styled(Heading)({
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
});

Score.defaultProps = {
  color: "brand",
  level: 1,
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

export const Badge = styled(Heading)({
  marginBottom: 0,
});

Badge.defaultProps = {
  level: 1,
};

export const Encouragement = styled(Heading)({
  marginBottom: 0,
});

Encouragement.defaultProps = {
  level: 3,
};

export const EncouragementLong = styled(Paragraph)({});

export const Category = styled(Button)({
  borderRadius: "11px",
  "@media (max-width: 768px)": {
    borderRadius: "6px",
  },
});

export const Categories = styled(Nav)({});

Categories.defaultProps = {
  gap: "small",
  background: "brand",
  round: "small",
};

export const Star = styled(StarBase)({
  width: 18,
  height: "auto",
});

Star.defaultProps = {
  color: "gold",
};
