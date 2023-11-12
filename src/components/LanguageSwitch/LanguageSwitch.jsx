import React from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "../Switch/Switch";
import { useLocation, useNavigate } from "react-router-dom";

const PolishFlag = () => (
  <svg width="30" height="20">
    <rect width="30" height="10" fill="white" />
    <rect width="30" height="10" y="10" fill="#D4213D" />
  </svg>
);

const GermanFlag = () => (
  <svg width="30" height="20">
    <rect width="30" height="6.67" fill="black" />
    <rect width="30" height="6.67" y="6.67" fill="#DD0000" />
    <rect width="30" height="6.67" y="13.34" fill="#FFCC00" />
  </svg>
);

const BritishFlag = () => (
  <svg width="30" height="20">
    <rect width="30" height="20" fill="white" />
    <rect width="30" height="2" y="9" fill="#C8102E" />
    <rect width="2" height="20" x="14" fill="#C8102E" />
  </svg>
);

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang).then(() => {
      localStorage.setItem("lang", lang);

      const pathParts = location.pathname.split("/").filter(Boolean); // Remove empty strings from the array
      if (pathParts.length > 0 && ["en", "de", "pl"].includes(pathParts[0])) {
        pathParts[0] = lang;
      } else {
        pathParts.unshift(lang);
      }
      const newPath = "/" + pathParts.join("/");

      navigate(newPath + location.search + location.hash, {
        replace: true,
        state: location.state,
      });
    });
  };

  return (
    <Switch
      config={[
        {
          active: i18n.language === "de",
          icon: GermanFlag,
          onClick: () => switchLanguage("de"),
        },
        {
          active: i18n.language === "pl",
          icon: PolishFlag,
          onClick: () => switchLanguage("pl"),
        },
        {
          active: i18n.language === "en",
          icon: BritishFlag,
          onClick: () => switchLanguage("en"),
        },
      ]}
    />
  );
};
