import React, { useState, useEffect, useRef, forwardRef } from "react";
import { TextInput, Heading, Box } from "grommet";
import { Helmet } from "react-helmet";

import { shuffle } from "../../utils/shuffle";
import * as S from "./Wizard.styles";
import {
  Achievement,
  Announce,
  Checkmark,
  Close,
  Refresh,
} from "grommet-icons";
import { Page } from "../Page/Page";
import { Header } from "../Header/Header";
import { useKeydownListener } from "../../hooks/useViewControls";
import { Dialog } from "../Dialog/Dialog";

import Joyride from "react-joyride";
import { TourTooltip } from "../TourTooltip/TourTooltip";
import { useParams } from "react-router-dom";

export const Wizard = ({
  baseLanguage,
  aimLanguage,
  config,
  questions = 10,
  theme,
  setTheme,
}) => {
  const { category } = useParams();

  const getWordList = (src) => shuffle(src).slice(0, questions);
  const [mode, setMode] = useState("training");
  const source = {
    name:
      config[category]?.name[baseLanguage] ||
      Object.values(config)[0].name[baseLanguage],
    value: config[category]?.value || Object.values(config)[0].value,
  };
  const [dialog, setDialog] = useState();
  const [wordList, setWordList] = useState(getWordList(source.value));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(wordList[0]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
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
      {
        title: "One More Thing!",
        target: "#categories",
        content: "Here, you can find a variety of categories to enjoy.",
        disableBeacon: true,
      },
    ],
    active: !localStorage.getItem("guidedOnTraining"),
  });

  const input = useRef(null);
  const hero = useRef(null);

  const checkAnswer = () => {
    if (
      currentWord[aimLanguage]
        .split(" / ")
        .map((el) => el.toLowerCase().replaceAll(/-/g, " "))
        .includes(userInput.toLowerCase().trim().replaceAll(/-/g, " ")) &&
      userInput !== ""
    ) {
      if (!revealed) {
        setScore(score + 1);
      }
      setUserInput("");
      setRevealed(false);
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setUserInput("");
      setRevealed(true);
    }
  };

  const finished = currentWordIndex === questions;

  const viewContinue = (e) => {
    if (e) e.stopPropagation();

    if (currentWordIndex === 0 && tour.active && tour.stepIndex === 2) {
      setTour((tour) => ({ ...tour, run: true }));
    }

    setRevealed(false);
    setCurrentWordIndex(currentWordIndex + 1);
  };

  const viewCorrectContinue = (e) => {
    viewContinue(e);
    setScore(score + 1);
  };

  const reset = () => {
    setCurrentWordIndex(0);
    setRevealed(false);
    setUserInput("");
    setScore(0);
  };

  const currentSet = wordList.map((el) => el[baseLanguage]).join("");
  const inputHasFocus =
    input && input.current && input.current === document.activeElement;

  useKeydownListener({
    keyEventMapping: {
      " ": [
        {
          cb: () => setRevealed(true),
          active: !revealed && !finished && mode === "training",
        },
        {
          cb: viewCorrectContinue,
          active: revealed && mode === "training",
        },
      ],
      Escape: [
        {
          cb: viewContinue,
          active: revealed && mode === "training",
        },
        {
          cb: () => setDialog("interruptTest") && mode === "training",
          active: mode === "test" && !dialog,
        },
      ],
      Enter: [
        {
          cb: viewCorrectContinue,
          active: revealed && mode === "training",
        },
        {
          cb: checkAnswer,
          active: mode === "test" && !finished,
        },
      ],
    },
    disabled: tour.run,
  });

  const resetAndShuffleCurrentSet = () => {
    reset();
    setWordList(shuffle(wordList));
  };

  const MoveOnToNewSet = forwardRef(({ primary = true }, ref) => (
    <S.Hero
      primary={primary}
      label="New set"
      onClick={() => {
        reset();
        setMode("training");
        setWordList(getWordList(source.value));
      }}
      ref={ref}
    />
  ));

  const AttemptAgain = forwardRef(
    ({ label = "Attempt again", primary = true }, ref) => (
      <S.Hero
        label={label}
        primary={primary}
        onClick={resetAndShuffleCurrentSet}
        ref={ref}
      />
    )
  );

  const Test = forwardRef((_, ref) => (
    <S.Hero
      ref={ref}
      label="Attempt test"
      onClick={() => {
        setMode("test");
        resetAndShuffleCurrentSet();
      }}
    />
  ));

  const Train = forwardRef((_, ref) => (
    <S.Option
      ref={ref}
      label="Keep training"
      onClick={() => {
        setMode("training");
        resetAndShuffleCurrentSet();
      }}
    />
  ));

  const View = (
    <S.View id="view">
      <S.ViewActionLeft
        secondary
        icon={<Close />}
        onClick={viewContinue}
        label={<S.EmptyLabel />}
      />

      <S.ViewActionRight
        onClick={viewCorrectContinue}
        icon={<Checkmark />}
        label={<S.EmptyLabel />}
        primary
      />
    </S.View>
  );

  const Write = (
    <S.WriteInput>
      <TextInput
        ref={input}
        placeholder="Translation"
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
    </S.WriteInput>
  );

  const StopIcon = mode === "test" ? Close : Refresh;

  const Quiz = (
    <>
      <S.Main id="stack">
        <Box direction="row" justify="between">
          <S.Progress id="progress">
            {currentWordIndex + 1}/{wordList.length}
          </S.Progress>

          {((revealed && mode === "test") || !!currentWordIndex) && (
            <S.ProgressScore id="score">
              <strong>
                {score}/
                {currentWordIndex + (revealed && mode === "test" ? 1 : 0)}
              </strong>{" "}
              <S.Star />
            </S.ProgressScore>
          )}

          {(!!currentWordIndex || mode === "test") && (
            <S.Reset
              icon={
                <StopIcon
                  id="stopIcon"
                  size="medium"
                  onClick={(e) => {
                    setDialog(
                      mode === "training" ? "drawNew" : "interruptTest"
                    );
                    e.stopPropagation();
                  }}
                />
              }
            />
          )}
        </Box>

        <S.Word revealed={revealed}>
          {currentWord && currentWord[baseLanguage]}
          <S.Answer>{revealed && `(${currentWord[aimLanguage]})`}</S.Answer>
        </S.Word>

        {mode === "test" && Write}
      </S.Main>

      {mode === "training" && (revealed ? View : <S.ViewPlaceholder />)}
    </>
  );

  const summary = (() => {
    if (score === questions) {
      return {
        Icon: Achievement,
        heading: "Perfect!",
        subHeading:
          "You can now attempt test or start anew with fresh flashcard set!",
        Hero: (() => {
          if (mode === "training") {
            return <Test ref={hero} />;
          }

          return <MoveOnToNewSet ref={hero} primary />;
        })(),
      };
    }

    return {
      Icon: Announce,
      heading: "Keep going!",
      subHeading: "You need to train more!",
      Hero:
        mode === "test" ? (
          <AttemptAgain ref={hero} />
        ) : (
          <AttemptAgain ref={hero} label="Keep training" />
        ),
    };
  })();

  const Result = (
    <S.Result>
      <S.Main border={0}>
        <S.Badge>
          <summary.Icon size="large" color="neutral-3" />
        </S.Badge>

        <S.Encouragement>{summary.heading}</S.Encouragement>

        <S.EncouragementLong>{summary.subHeading}</S.EncouragementLong>

        <S.Score>
          {score}/{questions}
        </S.Score>
      </S.Main>
      <S.Actions id="actions">
        {summary.Hero}

        {(() => {
          if (mode === "test") {
            if (score === questions) return <AttemptAgain primary={false} />;

            if (score >= questions * 0.8)
              return <MoveOnToNewSet primary={false} />;

            return <Train />;
          }

          return <MoveOnToNewSet primary={false} />;
        })()}
      </S.Actions>
    </S.Result>
  );

  useEffect(() => {
    if (hero.current && !inputHasFocus && !tour.run) {
      hero.current.focus();
    }
  }, [summary]);

  useEffect(() => {
    if (mode === "test") input.current.focus();
  }, [mode]);

  useEffect(() => {
    if (tour.active && revealed && tour.stepIndex === 0) {
      setTour((tour) => ({ ...tour, stepIndex: 1, run: true }));
    }
  }, [revealed]);

  useEffect(() => {
    if (tour.active && finished && [4, 5].includes(tour.stepIndex)) {
      setTour((tour) => ({
        ...tour,
        stepIndex: 5,
        run: true,
      }));
    }
  }, [finished]);

  useEffect(() => {
    setCurrentWord(wordList[currentWordIndex]);
  }, [currentWordIndex, currentSet, wordList]);

  useEffect(() => {
    if (input.current && mode === "test") {
      input.current.focus();
    }
  }, [currentSet, wordList, mode]);

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
      setTour((tour) => ({ ...tour, stepIndex: 6 }));
    }

    if (data.index === 6) {
      localStorage.setItem("guidedOnTraining", true);
      setTour((tour) => ({ ...tour, run: false, active: false }));
    }
  };

  const interruptDialogOpen = dialog === "interruptTest";
  const drawNewDialogOpen = dialog === "drawNew";

  return (
    <>
      <Helmet>
        <title>Wordie - {source.name}</title>
      </Helmet>

      <Joyride
        disableCloseOnEsc
        disableOverlayClose
        animation={false}
        active={tour.active}
        callback={joyrideCallback}
        tooltipComponent={TourTooltip}
        steps={tour.steps}
        run={tour.run}
        stepIndex={tour.stepIndex}
      />

      <Header theme={theme} setTheme={setTheme} />

      <Page>
        <S.Center
          onClick={
            !finished && mode === "training"
              ? () => setRevealed(true)
              : undefined
          }
        >
          <Heading textAlign="center">
            {mode === "test" ? `Test: ${source.name}` : source.name}
          </Heading>
          {finished ? Result : Quiz}
        </S.Center>
        <Dialog
          open={interruptDialogOpen || drawNewDialogOpen}
          title={interruptDialogOpen ? "Interrupt Test?" : "Draw new set?"}
          message={
            interruptDialogOpen
              ? "Are you sure you want to interrupt the ongoing test? Your current progress will be lost, and you'll be redirected back to the learning mode."
              : "Are you sure you want to draw new flashcards set? Your current progress will be lost."
          }
          actions={[
            {
              label: interruptDialogOpen ? "Interrupt" : "Draw new",
              onClick: () => {
                if (mode === "test") {
                  setMode("training");
                }

                reset();
                setWordList(getWordList(source.value));
                setDialog("");
              },
            },
            {
              label: interruptDialogOpen ? "Resume" : "Continue",
              onClick: () => {
                setDialog("");
              },
            },
          ]}
          setOpen={setDialog}
        />
      </Page>
    </>
  );
};
