import React from "react";
import { Button } from "grommet";

import * as S from "./Dialog.styles";

export const Dialog = ({ open, setOpen, ...cardProps }) => {
  return open ? (
    <S.Root
      onEsc={() => setOpen('')}
      onClickOutside={() => setOpen('')}
      responsive={false}
    >
      <Card {...cardProps} />
    </S.Root>
  ) : null;
};

export const Card = ({ title, actions, message }) => {
  const theme = localStorage.getItem("theme") || "light";

  return (
    <S.Card
      round={"small"}
      background={theme === "dark" ? "dark-1" : undefined}
    >
      <S.CardHeader>
        <S.Heading>{title}</S.Heading>
      </S.CardHeader>
      <S.CardBody>{message}</S.CardBody>
      <S.CardFooter background={theme === "dark" ? "dark-2" : "light-2"}>
        {actions.map((a, i, arr) => (
          <Button
            label={a.label}
            color={arr.length > 0 && i === 0 ? "status-critical" : "neutral-3"}
            primary={i === 1}
            onClick={a.onClick}
          />
        ))}
      </S.CardFooter>
    </S.Card>
  );
};
