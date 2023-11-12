import React from "react";
import * as S from "./Switch.styles";

export const Switch = ({ config }) => {
  const activeIndex = config.findIndex((entry) => entry.active);
  const lastActive = activeIndex === config.length - 1;

  const iconStyle = { width: 20, height: 20 };

  return (
    <S.Root
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
        }
      }}
      onClick={(e) => {
        (lastActive ? config[0] : config[activeIndex + 1]).onClick();
        e.target.blur();
      }}
    >
      {config.map((entry) => (
        <S.Option
          active={entry.active}
          label={entry.label || undefined}
          icon={entry.icon ? <entry.icon style={iconStyle} /> : undefined}
        />
      ))}
    </S.Root>
  );
};
