import React from "react";
import * as S from "../Dialog/Dialog.styles";
import { Button } from "grommet";
import { ThemeProvider } from "../..";

export const TourTooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}) => {
  const theme = localStorage.getItem("theme") || "dark";

  return (
    <ThemeProvider theme={theme}>
      <S.Card
        width={'300px'}
        background={theme === "dark" ? "dark-1" : 'white'}
        {...tooltipProps}
      >
        {step.title && (
          <S.CardHeader>
            <S.Heading>{step.title}</S.Heading>
          </S.CardHeader>
        )}
        <S.CardBody>{step.content}</S.CardBody>
        <S.CardFooter background={theme === "dark" ? "dark-2" : "light-2"}>
          {continuous && (
            <Button
              {...primaryProps}
              color={'neutral-3'}
              primary
              label={<span id="next">{primaryProps.title}</span>}
            />
          )}
          {!continuous && (
            <Button
              {...closeProps}
              color={'neutral-3'}
              label={<span id="close">{closeProps.title}</span>}
            />
          )}
        </S.CardFooter>
      </S.Card>
    </ThemeProvider>
  );
};
