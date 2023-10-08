import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  Grommet,
  TextInput,
  Button,
  Page,
} from "grommet";
import { general, homeAndLocalArea } from "./sources";

import { shuffle } from "./utils/shuffle";
import { theme } from "./utils/theme";
import * as S from "./styles";
import { Achievement, Announce, Home, Launch, Trophy } from "grommet-icons";

const QUESTIONS = 10;

const getWordList = (src) => shuffle(src).slice(0, QUESTIONS);

export const App = () => {
  const [source, setSource] = useState({ name: "General", value: general });
  const [wordList, setWordList] = useState(getWordList(source.value));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(wordList[0]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const inputRef = useRef(null);
  const continueRef = useRef(null);

  useEffect(() => {
    setCurrentWord(wordList[currentWordIndex]);

    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (continueRef.current) {
      continueRef.current.focus();
    }
  }, [currentWordIndex, wordList]);

  const checkAnswer = () => {
    if (
      currentWord.german
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

  const reset = () => {
    setCurrentWordIndex(0);
    setRevealed(false);
    setUserInput("");
    setScore(0);
  };

  useEffect(() => {
    reset();
    setWordList(getWordList(source.value));
  }, [source.name, source.value]);

  const NewSet = (
    <S.NewSet
      label="New set"
      ref={score === QUESTIONS ? continueRef : undefined}
      onClick={() => {
        reset();
        setWordList(getWordList(source.value));
      }}
    />
  );

  const RedoSet = (
    <S.RedoSet
      label="Repeat set"
      ref={score === QUESTIONS ? undefined : continueRef}
      onClick={() => {
        reset();
        setWordList(shuffle(wordList));
      }}
    />
  );

  const Quiz = (
    <S.Center>
      <S.Main width='medium'>
        <S.Progress>
          {currentWordIndex + 1}/{wordList.length}
        </S.Progress>

        <S.Word>
          {currentWord && currentWord.english}
          <S.Answer>{revealed && `(${currentWord.german})`}</S.Answer>
        </S.Word>

        <S.Control>
          <TextInput
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                checkAnswer();
              }
            }}
            placeholder="Translation"
            type="text"
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </S.Control>
      </S.Main>

      {!!currentWordIndex && (
        <S.Score>
          {score}/{currentWordIndex}
        </S.Score>
      )}
    </S.Center>
  );

  const result = (() => {
    if (score >= QUESTIONS) {
      return {
        Icon: Achievement,
        heading: "Perfect!",
        subHeading: "You can now move on to a new set!",
      };
    }

    if (score >= QUESTIONS * 0.8) {
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
    <S.Center>
      <S.Main>
        <S.Badge>
          <result.Icon size="large" color="brand" />
        </S.Badge>

        <S.Encouragement>{result.heading}</S.Encouragement>

        <S.EncouragementLong>{result.subHeading}</S.EncouragementLong>

        <S.Score>
          {score}/{QUESTIONS}
        </S.Score>
      </S.Main>
      <S.Actions>
        {NewSet}
        {RedoSet}
      </S.Actions>
    </S.Center>
  );

  return (
    <Grommet theme={theme}>
      <Page direction="row">
        <S.Categories>
          <S.Navigation>
            <Button
              active={source.name === "General"}
              icon={<Launch />}
              onClick={() => setSource({ name: "General", value: general })}
            />
            <Button
              active={source.name === "Home and local area"}
              icon={<Home />}
              onClick={() =>
                setSource({
                  name: "Home and local area",
                  value: homeAndLocalArea,
                })
              }
            />
          </S.Navigation>
        </S.Categories>
        {currentWordIndex !== QUESTIONS ? Quiz : Result}
      </Page>
    </Grommet>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
