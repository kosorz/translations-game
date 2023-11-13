import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useTrainingTour = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t("tour.step1.title"),
      target: "#stack",
      content: t("tour.step1.content"),
      disableBeacon: true,
    },
    {
      title: t("tour.step2.title"),
      target: "#view",
      content: t("tour.step2.content"),
      placement: "bottom-center",
      disableBeacon: true,
    },
    {
      title: t("tour.step3.title"),
      target: "#progress",
      placement: "right",
      content: t("tour.step3.content"),
      disableBeacon: true,
    },
    {
      title: t("tour.step4.title"),
      target: "#score",
      content: t("tour.step4.content"),
      disableBeacon: true,
    },
    {
      title: t("tour.step5.title"),
      target: "#stopIcon",
      content: t("tour.step5.content"),
      placement: "left",
      disableBeacon: true,
    },
    {
      title: t("tour.step6.title"),
      target: "#actions",
      content: t("tour.step6.content"),
      disableBeacon: true,
    },
  ]

  const [tour, setTour] = useState({
    stepIndex: 0,
    run: !localStorage.getItem("guidedOnTraining"),
    active: !localStorage.getItem("guidedOnTraining"),
  });
  
  const joyrideCallback = (data) => {
    if (data.lifecycle !== "complete") return;

    if (data.index === 0) {
      setTour((tour) => ({ ...tour, run: false }));
    }

    if (data.index === 1) {
      setTour((tour) => ({
        ...tour,
        stepIndex: 2,
        run: false,
      }));
    }

    if (data.index === 2) {
      setTour((tour) => ({ ...tour, stepIndex: 3 }));
    }

    if (data.index === 3) {
      setTour((tour) => ({ ...tour, stepIndex: 4 }));
    }

    if (data.index === 4) {
      setTour((tour) => ({ ...tour, run: false }));
    }

    if (data.index === 5) {
      localStorage.setItem("guidedOnTraining", true);
      setTour((tour) => ({ ...tour, run: false, active: false }));
    }
  };

  return { setTour, tour: { ...tour, steps }, joyrideCallback };
};
