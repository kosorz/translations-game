import React from "react";
import * as S from "../Dialog/Dialog.styles";
import { Button } from "grommet";
import { ThemeProvider } from "../..";

export const TourTooltip = ({ step, closeProps, tooltipProps }) => {
  const theme = localStorage.getItem("theme") || "light";

  return (
    <ThemeProvider theme={theme}>
      <S.Card
        width={"300px"}
        background={theme === "dark" ? "dark-1" : "white"}
        {...tooltipProps}
      >
        {step.title && (
          <S.CardHeader>
            <S.Heading>{step.title}</S.Heading>
          </S.CardHeader>
        )}

        <S.CardBody>{step.content}</S.CardBody>

        <S.CardFooter background={theme === "dark" ? "dark-2" : "light-2"}>
          <Button
            {...closeProps}
            label={<span id="close">{closeProps.title}</span>}
          />
        </S.CardFooter>
      </S.Card>
    </ThemeProvider>
  );
};
