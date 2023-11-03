import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { TextInput, Heading, Box } from "grommet";

import { shuffle } from "../../utils/shuffle";
import * as S from "./Wizard.styles";
import { Achievement, Announce, Trophy, Checkmark, Close } from "grommet-icons";
import { Sidebar } from "../Sidebar/Sidebar";
import { Page } from "../Page/Page";
import { Header } from "../Header/Header";
import { useKeydownListener } from "../../hooks/useViewControls";

export const Wizard = ({
  baseLanguage,
  aimLanguage,
  config,
  questions = 10,
  setCondition,
  condition,
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

  const continueRef = useRef(null);
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

  const reset = () => {
    setCurrentWordIndex(0);
    setRevealed(false);
    setUserInput("");
    setScore(0);
  };

  const currentSet = wordList.map((el) => el[baseLanguage]).join("");

  useKeydownListener({
    " ": { cb: () => setRevealed(true), enabled: !revealed },
    Escape: { cb: viewContinue, enabled: revealed },
    Enter: {
      cb: () => {
        viewContinue();
        setScore(score + 1);
      },
      enabled: revealed,
    },
  });

  useEffect(() => {
    setCurrentWord(wordList[currentWordIndex]);

    if (continueRef.current) {
      continueRef.current.focus();
    }
  }, [currentWordIndex, currentSet, wordList]);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentSet, wordList]);

  const NewSet = (
    <S.NewSet
      label="New set"
      ref={score === questions ? continueRef : undefined}
      onClick={() => {
        reset();
        setWordList(getWordList(source.value));
      }}
    />
  );

  const RedoSet = (
    <S.RedoSet
      label="Repeat set"
      ref={score === questions ? undefined : continueRef}
      onClick={() => {
        reset();
        setWordList(shuffle(wordList));
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
        onClick={(e) => {
          viewContinue(e);
          setScore(score + 1);
        }}
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

          {((revealed && condition === "write") || !!currentWordIndex) && (
            <S.ProgressScore>
              {score}/
              {currentWordIndex + (revealed && condition === "write" ? 1 : 0)}{" "}
              <S.Star />
            </S.ProgressScore>
          )}
        </Box>

        <S.Word revealed={revealed}>
          {currentWord && currentWord[baseLanguage]}
          <S.Answer>{revealed && `(${currentWord[aimLanguage]})`}</S.Answer>
        </S.Word>

        {condition === "write" && Write}
      </S.Main>

      {condition === "view" && (revealed ? View : <S.ViewPlaceholder />)}
    </>
  );

  const Summary = (() => {
    if (score >= questions) {
      return {
        Icon: Achievement,
        heading: "Perfect!",
        subHeading: "You can now move on to a new set!",
      };
    }

    if (score >= questions * 0.8) {
      return {
        Icon: Trophy,
        heading: "Almost!",
        subHeading: "You can now move or consider repeating set!",
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
        {NewSet}
        {RedoSet}
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
      <Header condition={condition} setCondition={setCondition} />
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
            !finished && condition === "view"
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
