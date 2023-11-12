import { useState } from "react";

export const useTrainingTour = ({ aimLanguage }) => {
  const [tour, setTour] = useState({
    run: !localStorage.getItem("guidedOnTraining"),
    stepIndex: 0,
    steps: [
      {
        title: "Getting Started",
        target: "#stack",
        content: `Begin by considering the word's ${aimLanguage} translation, and then click the card to reveal the answer.`,
        disableBeacon: true,
      },
      {
        title: "How Did You Perform?",
        target: "#view",
        content: "Let us know if you knew the answer after revealing it.",
        placement: "bottom-center",
        disableBeacon: true,
      },
      {
        title: "Tracking Your Progress",
        target: "#progress",
        content:
          "Here, you can monitor how many flashcards from the set you've already seen.",
        disableBeacon: true,
      },
      {
        title: "Check Your Score",
        target: "#score",
        content:
          "Discover how many points you've earned; points will be relevant later on.",
        disableBeacon: true,
      },
      {
        title: "Starting Fresh",
        target: "#stopIcon",
        content: "Begin anew with a fresh deck of flashcards!",
        placement: "left",
        disableBeacon: true,
      },
      {
        title: "Keep Going!",
        target: "#actions",
        content: "Explore the possible challenges that lie ahead.",
        disableBeacon: true,
      },
    ],
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

  return { setTour, tour, joyrideCallback };
};
