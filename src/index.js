import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  Grommet,
  Box,
  Heading,
  Button,
  Paragraph,
  TextInput,
  DropButton,
} from "grommet";

import { foundation } from "./sources";
import { shuffle } from "./utils/shuffle";
import { theme } from "./utils/theme";

const source = foundation;

const QUESTIONS = 10;

const getWordList = () => shuffle(source).slice(0, QUESTIONS);

export const App = () => {
  const [wordList, setWordList] = useState(getWordList());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(wordList[0]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    setCurrentWord(wordList[currentWordIndex]);
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

  const handleLetterClick = (letter) => {
    const inputElement = inputRef.current;
    const startPos = inputElement.selectionStart;
    const endPos = inputElement.selectionEnd;

    const newText =
      userInput.substring(0, startPos) + letter + userInput.substring(endPos);

    setUserInput(newText);

    const newCaretPosition = startPos + letter.length;
    inputElement.focus();
    inputElement.setSelectionRange(newCaretPosition, newCaretPosition);
  };

  const letters = "äöüß";

  const reset = () => {
    setCurrentWordIndex(0);
    setRevealed(false);
    setUserInput("");
    setScore(0);
  };

  return (
    <Grommet theme={theme}>
      {currentWordIndex !== QUESTIONS ? (
        <Box align="center">
          <Box
            border={{ color: "brand", size: "large" }}
            width="medium"
            pad="medium"
            elevation="big"
            round
            responsive
          >
            <Paragraph
              style={{
                margin: 0,
                textAlign: "left",
              }}
              color="gray"
            >
              {currentWordIndex + 1}/{wordList.length}
            </Paragraph>
            <Heading
              style={{
                paddingBottom: revealed ? 0 : "24px",
              }}
              level={2}
              responsive
              textAlign="center"
              weight="bold"
            >
              {currentWord && currentWord.english}
              <Heading style={{ margin: 0 }} color="gray" level={4}>
                {revealed && `(${currentWord.german})`}
              </Heading>
            </Heading>

            <Box direction="row" gap="2px">
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
              <DropButton
                style={{ marginLeft: "8px" }}
                dropAlign={{ top: "bottom" }}
                primary
                label={"🇩🇪"}
                size="small"
                dropProps={{
                  style: {
                    border: 0,
                    boxShadow: "none",
                  },
                }}
                dropContent={
                  <Box wrap gap="2px" style={{ padding: "2px" }}>
                    {letters.split("").map((letter, index) => (
                      <Button
                        size="small"
                        key={index}
                        label={letter}
                        onClick={() => handleLetterClick(letter)}
                      />
                    ))}
                  </Box>
                }
              />
            </Box>
          </Box>

          {!!currentWordIndex && (
            <Heading level={2} color="brand">
              {score}/{currentWordIndex} ✅
            </Heading>
          )}
        </Box>
      ) : (
        <Box align="center">
          <Box
            direction="column"
            width="small"
            pad="medium"
            elevation="big"
            round
            responsive
          >
            <Heading level={1} color='brand'>
              {score}/{QUESTIONS}
            </Heading>
            <Button
              label="Repeat set"
              onClick={() => {
                reset();
                setWordList(shuffle(wordList));
              }}
            />

            <Button
                          style={{
                marginTop: "8px",
              }}
              secondary
              primary
              label="New set"
              onClick={() => {
                reset();
                setWordList(getWordList());
              }}
            />

          </Box>
        </Box>
      )}
    </Grommet>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
