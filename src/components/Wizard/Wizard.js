import React, { useState, useEffect, useRef, forwardRef } from "react";
import { TextInput, Heading, Box } from "grommet";

import { shuffle } from "../../utils/shuffle";
import * as S from "./Wizard.styles";
import { Achievement, Announce, Checkmark, Close } from "grommet-icons";
import { Sidebar } from "../Sidebar/Sidebar";
import { Page } from "../Page/Page";
import { Header } from "../Header/Header";
import { useKeydownListener } from "../../hooks/useViewControls";
import { Dialog } from "../Dialog/Dialog";

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
  const [wordList, setWordList] = useState(getWordList(source.value));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(wordList[0]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const input = useRef(null);
  const nextButton = useRef(null);

  const checkAnswer = () => {
    if (
      currentWord[aimLanguage]
        .split(" / ")
        .map((el) => el.toLowerCase())
        .includes(userInput.toLowerCase()) &&
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
      { cb: () => setAbortingTest(false), active: abortingTest },
    ],
    Enter: [{ cb: () => viewCorrectContinue, active: revealed }],
  });

  useEffect(() => {
    setCurrentWord(wordList[currentWordIndex]);
  }, [currentWordIndex, currentSet, wordList]);

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [currentSet, wordList]);

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
    <S.View>
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

  const Quiz = (
    <>
      <S.Main width="medium">
        <Box direction="row" justify="between">
          <S.Progress>
            {currentWordIndex + 1}/{wordList.length}
          </S.Progress>

          {((revealed && mode === "test") || !!currentWordIndex) && (
            <S.ProgressScore>
              {score}/{currentWordIndex + (revealed && mode === "test" ? 1 : 0)}{" "}
              <S.Star />
            </S.ProgressScore>
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
        subHeading: "You can now move on to a new set!",
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

  useEffect(() => {
    if (nextButton.current) {
      nextButton.current.focus();
    }
  }, [summary]);

  useEffect(() => {
    if (mode === "test") input.current.focus();
  }, [mode]);

  const Result = (
    <>
      <S.Main>
        <S.Badge>
          <summary.Icon size="large" color="brand" />
        </S.Badge>

        <S.Encouragement>{summary.heading}</S.Encouragement>

        <S.EncouragementLong>{summary.subHeading}</S.EncouragementLong>

        <S.Score>
          {score}/{questions}
        </S.Score>
      </S.Main>
      <S.Actions>
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
    </>
  );

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Page>
        <Sidebar>
          <S.Categories>
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
          <Heading textAlign="center">{source.name}</Heading>
          {finished ? Result : Quiz}
        </S.Center>
        <Dialog
          open={abortingTest}
          actions={[
            {
              label: "Interrupt",
              onClick: () => {
                setMode("training");
                resetAndShuffleCurrentSet();
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
      </Page>
    </>
  );
};
