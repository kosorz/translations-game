import styled from "styled-components";
import { Box, Button, Heading, Paragraph, Nav } from "grommet";
import { Star as StarBase } from "grommet-icons";

export const Result = styled(Box)({
  touchAction: "manipulation",
});

export const Progress = styled(Paragraph)({
  margin: 0,
  textAlign: "left",
});

export const Main = styled(Box)({
  textAlign: "center",
});

Main.defaultProps = {
  border: { color: "brand", size: "large" },
  pad: {
    right: "small",
    left: "small",
    top: "medium",
    bottom: "medium",
  },
  margin: {
    bottom: "medium",
  },
  width: 'medium',
  elevation: "big",
  round: true,
  responsive: true,
  justify: "between",
};

export const Center = styled(Box)({
  flexGrow: 1,
  outline: "none!important",
});

Center.defaultProps = {
  align: "center",
  round: "small",
  focusIndicator: false,
  pad: { bottom: "medium", right: "medium", left: "medium" },
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

export const WriteInput = styled(Box)({});

WriteInput.defaultProps = {
  direction: "row",
  gap: "2px",
};

export const ProgressScore = styled(Progress)({
  display: "flex",
  alignItems: "center",
  fontSize: 20,
});

ProgressScore.defaultProps = {
  color: "brand",
};

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

Actions.defaultProps = {
  margin: {
    horizontal: 'auto',
  }
}

export const Option = styled(Button)({
  marginTop: "8px",
  border: "none",
  width: 250,
});

Option.defaultProps = {
  color: "brand",
};

export const Hero = styled(Button)({
  marginTop: "8px",
  width: 250,
});

Hero.defaultProps = {
  primary: true,
  color: "brand",
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
  width: 24,
  height: "auto",
  paddingRight: 0,
});

Star.defaultProps = {
  color: "gold",
};

export const View = styled(Box)({});

View.defaultProps = {
  justify: "center",
  margin: { horizontal: "auto", top: "xsmall" },
  direction: "row",
  alignItems: "center",
  justifyContent: "center",
};

export const ViewAction = styled(Button)({
  textAlign: "center",
  flexBasis: 100,

  "> div > div": {
    width: 0,
  },
});

export const ViewActionLeft = styled(ViewAction)({
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});

ViewActionLeft.defaultProps = {
  color: "status-critical",
};

export const ViewActionRight = styled(ViewAction)({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});

ViewActionRight.defaultProps = {
  color: 'brand',
};

export const EmptyLabel = styled(Box)({
  height: 35,
});

export const ViewPlaceholder = styled(Box)({
  height: 47,
});

export const Reset = styled(Button)({
  padding: 0,
})
