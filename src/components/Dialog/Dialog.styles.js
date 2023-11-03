import {
  Heading as HeadingBase,
  Layer as LayerBase,
  Card as CardBase,
  CardBody as CardBodyBase,
  CardFooter as CardFooterBase,
  CardHeader as CardHeaderBase,
} from "grommet";
import styled from "styled-components";

export const Root = styled(LayerBase)({
  borderRadius: 12,
});

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
  margin: { bottom: "medium", top: 'small', horizontal: "medium" },
};

export const CardFooter = styled(CardFooterBase)({
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
});

CardFooter.defaultProps = {
  pad: { vertical: "small", horizontal: "medium" },
};
