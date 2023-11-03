import {
  Heading as HeadingBase,
  Layer as LayerBase,
  Card as CardBase,
  CardBody as CardBodyBase,
  CardFooter as CardFooterBase,
  CardHeader as CardHeaderBase,
} from "grommet";
import styled from "styled-components";

export const Root = styled(LayerBase)({});

export const Card = styled(CardBase)({});

Card.defaultProps = {
  width: "medium",
};

export const CardHeader = styled(CardHeaderBase)({});

CardHeader.defaultProps = {
  margin: { top: "small", left: "medium", right: "medium" },
};

export const Heading = styled(HeadingBase)({});

Heading.defaultProps = {
  level: 3,
  margin: { top: "small", bottom: "small" },
};

export const CardBody = styled(CardBodyBase)({});

CardBody.defaultProps = {
  margin: { vertical: "medium", horizontal: "medium" },
};

export const CardFooter = styled(CardFooterBase)({});

CardFooter.defaultProps = {
  pad: { vertical: "small", horizontal: "medium" },
};
