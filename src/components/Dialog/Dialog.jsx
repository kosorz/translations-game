import React from "react";
import { Button } from "grommet";

import * as S from "./Dialog.styles";

export const Dialog = ({ open, setOpen, title, actions, message }) => {
  const theme = localStorage.getItem("theme") || "dark";

  return open ? (
    <S.Root
      onEsc={() => setOpen(false)}
      onClickOutside={() => setOpen(false)}
      responsive={false}
    >
      <S.Card round={'small'} background={theme === "dark" ? "dark-1" : undefined}>
        <S.CardHeader>
          <S.Heading>{title}</S.Heading>
        </S.CardHeader>
        <S.CardBody>{message}</S.CardBody>
        <S.CardFooter background={theme === "dark" ? "dark-2" : "light-2"}>
          {actions.map((a, i) => (
            <Button
              label={a.label}
              color={i === 0 ? "status-critical" : 'neutral-3'}
              primary={i === 1}
              onClick={a.onClick}
            />
          ))}
        </S.CardFooter>
      </S.Card>
    </S.Root>
  ) : null;
};
