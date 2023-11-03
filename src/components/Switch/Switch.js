import React from "react";
import * as S from "./Switch.styles";

export const Switch = ({ config }) => {
  const [first, second] = config;

  const iconStyle = { width: 20, height: 20 };

  return (
    <S.Root
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
        }
      }}
      onClick={(e) => {
        (first.active ? second : first).onClick();
        e.target.blur();
      }}
    >
      <S.Option active={first.active} icon={<first.icon style={iconStyle} />} />
      <S.Option
        active={second.active}
        icon={<second.icon style={iconStyle} />}
      />
    </S.Root>
  );
};
