import React, { useState, useEffect, useRef, forwardRef } from "react";
import { TextInput, Heading, Box } from "grommet";

import { shuffle } from "../../utils/shuffle";
import * as S from "./Wizard.styles";
import {
  Achievement,
  Announce,
  Checkmark,
  Close,
  Refresh,
} from "grommet-icons";
import { Sidebar } from "../Sidebar/Sidebar";
import { Page } from "../Page/Page";
import { Header } from "../Header/Header";
import { useKeydownListener } from "../../hooks/useViewControls";
import { Dialog } from "../Dialog/Dialog";

import Joyride from "react-joyride";
import { TourTooltip } from "../TourTooltip/TourTooltip";

export const Wizard = ({
  baseLanguage,
  aimLanguage,
  config,
  questions = 10,
  theme,
  setTheme,
}) => {
  const getWordList = (src) => shuffle(src).slice(0, questions);
  const [mode, setMode] = useState("training");
  const [source, setSource] = useState({
    name: Object.values(config)[0].name[baseLanguage],
    value: Object.values(config)[0].value,
  });
  const [abortingTest, setAbortingTest] = useState();
  const [renewingTraining, setRenewingTraining] = useState();
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
        position: "right",
      },
    ],
    active: !localStorage.getItem("guidedOnTraining"),
    continuous: false,
  });

  const input = useRef(null);
  const nextButton = useRef(null);

  const checkAnswer = () => {
    if (
      currentWord[aimLanguage]
        .split(" / ")
        .map((el) => el.toLowerCase())
        .includes(userInput.toLowerCase().trim()) &&
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
    " ": [
      {
        cb: () => setRevealed(true),
        active: !revealed && !finished && !inputHasFocus,
      },
      { cb: viewCorrectContinue, active: revealed && !inputHasFocus },
    ],
    Escape: [
      { cb: viewContinue, active: revealed && mode === "training" },
      {
        cb: () => setAbortingTest(true),
        active: mode === "test" && !abortingTest,
      },
    ],
    Enter: [{ cb: () => viewCorrectContinue, active: revealed }],
  });

  const resetAndShuffleCurrentSet = () => {
    reset();
    setWordList(shuffle(wordList));
  };

  const onSwitchCategory = ({ name, value }) => {
    setSource({ name, value });
    reset();
    setWordList(getWordList(value));
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
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            checkAnswer();
          }
        }}
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

          {!!currentWordIndex && (
            <StopIcon
              id="stopIcon"
              size="medium"
              onClick={(e) => {
                (mode === "training" ? setRenewingTraining : setAbortingTest)(
                  true
                );
                e.stopPropagation();
              }}
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
            return <Test ref={nextButton} />;
          }

          return <MoveOnToNewSet ref={nextButton} primary />;
        })(),
      };
    }

    return {
      Icon: Announce,
      heading: "Keep going!",
      subHeading: "You need to train more!",
      Hero:
        mode === "test" ? (
          <AttemptAgain ref={nextButton} />
        ) : (
          <AttemptAgain ref={nextButton} label="Keep training" />
        ),
    };
  })();

  const Result = (
    <S.Result>
      <S.Main>
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
    if (nextButton.current) {
      nextButton.current.focus();
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
    console.log(tour);

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
    if (input.current) {
      input.current.focus();
    }
  }, [currentSet, wordList]);

  const joyrideCallback = (data) => {
    if (data.lifecycle !== "complete") return;

    if (data.index === 0) {
      setTour((tour) => ({ ...tour, run: false }));
    }

    if (data.index === 1) {
      setTour((tour) => ({
        ...tour,
        stepIndex: 2,
        continuous: true,
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

  return (
    <>
      <Joyride
        active={tour.active}
        callback={joyrideCallback}
        tooltipComponent={TourTooltip}
        animation={false}
        steps={tour.steps}
        run={tour.run}
        continuous={tour.continuous}
        stepIndex={tour.stepIndex}
      />

      <Header theme={theme} setTheme={setTheme} />
      <Page>
        <Sidebar>
          <S.Categories id="categories">
            {Object.values(config).map((category) => (
              <S.Category
                focusIndicator={false}
                active={source.name === category.name[baseLanguage]}
                icon={<category.Icon />}
                onClick={(e) => {
                  e.target.blur();

                  setMode("training");
                  onSwitchCategory({
                    name: category.name[baseLanguage],
                    value: category.value,
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                  }
                }}
              />
            ))}
          </S.Categories>
        </Sidebar>
        <S.Center
          onClick={
            !finished && mode === "training"
              ? () => setRevealed(true)
              : undefined
          }
        >
          <Heading textAlign="center">{mode === 'test' ? `Test: ${source.name}` : source.name}</Heading>
          {finished ? Result : Quiz}
        </S.Center>
        <Dialog
          open={abortingTest}
          actions={[
            {
              label: "Interrupt",
              onClick: () => {
                setMode("training");
                reset();
                setWordList(getWordList(source.value));
                setAbortingTest(false);
              },
            },
            {
              label: "Resume",
              onClick: () => {
                setAbortingTest(false);
              },
            },
          ]}
          message={
            "Are you sure you want to interrupt the ongoing test? Your current progress will be lost, and you'll be redirected back to the learning mode."
          }
          title="Interrupt Test?"
          setOpen={setAbortingTest}
        />
        <Dialog
          open={renewingTraining}
          actions={[
            {
              label: "Draw new",
              onClick: () => {
                reset();
                setWordList(getWordList(source.value));
                setRenewingTraining(false);
              },
            },
            {
              label: "Continue",
              onClick: () => {
                setRenewingTraining(false);
              },
            },
          ]}
          message={
            "Are you sure you want to draw new flashcards set? Your current progress will be lost."
          }
          title="Draw new set?"
          setOpen={setRenewingTraining}
        />
      </Page>
    </>
  );
};
