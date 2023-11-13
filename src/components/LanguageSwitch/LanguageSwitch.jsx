import React from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "../Switch/Switch";
import { useLocation, useNavigate } from "react-router-dom";

const PolishFlag = () => (
  <svg width="20" height="13.33">
    <rect width="20" height="6.67" fill="white" />
    <rect width="20" height="6.67" y="6.67" fill="#D4213D" />
  </svg>
);

const GermanFlag = () => (
  <svg width="20" height="13.33">
    <rect width="20" height="4.44" fill="black" />
    <rect width="20" height="4.44" y="4.44" fill="#DD0000" />
    <rect width="20" height="4.44" y="8.88" fill="#FFCC00" />
  </svg>
);

const BritishFlag = () => (
  <svg width="20" height="13.33">
    <rect width="20" height="13.33" fill="white" />
    <rect width="20" height="1.33" y="6" fill="#C8102E" />
    <rect width="1.33" height="13.33" x="9.33" fill="#C8102E" />
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
