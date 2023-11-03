import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { TextInput, Heading, Box } from "grommet";

import { shuffle } from "../../utils/shuffle";
import * as S from "./Wizard.styles";
import { Achievement, Announce, Checkmark, Close } from "grommet-icons";
import { Sidebar } from "../Sidebar/Sidebar";
import { Page } from "../Page/Page";
import { Header } from "../Header/Header";
import { useKeydownListener } from "../../hooks/useViewControls";

export const Wizard = ({
  baseLanguage,
  aimLanguage,
  config,
  questions = 10,
  setMode,
  mode,
  theme,
  setTheme,
}) => {
  const getWordList = (src) => shuffle(src).slice(0, questions);

  const [source, setSource] = useState({
    name: Object.values(config)[0].name[baseLanguage],
    value: Object.values(config)[0].value,
  });
  const [wordList, setWordList] = useState(getWordList(source.value));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(wordList[0]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const inputRef = useRef(null);

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

  useKeydownListener({
    " ": [
      { cb: () => setRevealed(true), active: !revealed && !finished },
      { cb: viewCorrectContinue, active: revealed },
    ],
    Escape: [{ cb: viewContinue, active: revealed }],
    Enter: [{ cb: () => viewCorrectContinue, active: revealed }],
  });

  useEffect(() => {
    setCurrentWord(wordList[currentWordIndex]);
  }, [currentWordIndex, currentSet, wordList]);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentSet, wordList]);

  const MoveOnToNewSet = ({ primary } = { primary: true }) => (
    <S.Hero
      primary={primary}
      label="New set"
      onClick={() => {
        reset();
        setMode("training");
        setWordList(getWordList(source.value));
      }}
    />
  );

  const resetAndShuffleCurrentSet = () => {
    reset();
    setWordList(shuffle(wordList));
  };

  const AttemptAgain = ({ label = "Attempt again", primary = true }) => (
    <S.Hero
      label={label}
      primary={primary}
      onClick={resetAndShuffleCurrentSet}
    />
  );

  const Test = (
    <S.Hero
      label="Attempt test"
      onClick={() => {
        setMode("test");
        resetAndShuffleCurrentSet();
      }}
    />
  );

  const Train = (
    <S.Option
      label="Keep training"
      onClick={() => {
        setMode("training");
        resetAndShuffleCurrentSet();
      }}
    />
  );

  const View = (
    <S.View>
      <S.ViewActionLeft
        secondary
        icon={<Close color="red" />}
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
        ref={inputRef}
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

  const Summary = (() => {
    if (score === questions) {
      return {
        Icon: Achievement,
        heading: "Perfect!",
        subHeading: "You can now move on to a new set!",
      };
    }

    return {
      Icon: Announce,
      heading: "Keep going!",
      subHeading: "You need to train more!",
    };
  })();

  const Result = (
    <>
      <S.Main>
        <S.Badge>
          <Summary.Icon size="large" color="brand" />
        </S.Badge>

        <S.Encouragement>{Summary.heading}</S.Encouragement>

        <S.EncouragementLong>{Summary.subHeading}</S.EncouragementLong>

        <S.Score>
          {score}/{questions}
        </S.Score>
      </S.Main>
      <S.Actions>
        {(() => {
          if (score === questions) {
            if (mode === "training") {
              return Test;
            }

            if (mode === "test") {
              return <MoveOnToNewSet primary />;
            }
          }

          if (mode === "test") {
            return <AttemptAgain />;
          }

          return <AttemptAgain label="Keep training" />;
        })()}

        {(() => {
          if (mode === "test") {
            if (score === questions) {
              return <AttemptAgain primary={false} />;
            }

            if (score >= questions * 0.8)
              return <MoveOnToNewSet primary={false} />;

            return Train;
          }

          return <MoveOnToNewSet primary={false} />;
        })()}
      </S.Actions>
    </>
  );

  const onSwitchCategory = ({ name, value }) => {
    setSource({
      name,
      value,
    });
    reset();
    setWordList(getWordList(value));
  };

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Page>
        <Sidebar>
          <S.Categories>
            {Object.values(config).map((category) => (
              <S.Category
                active={source.name === category.name[baseLanguage]}
                icon={<category.Icon />}
                onClick={() =>
                  onSwitchCategory({
                    name: category.name[baseLanguage],
                    value: category.value,
                  })
                }
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
      </Page>
    </>
  );
};
