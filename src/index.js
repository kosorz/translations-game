import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { foundation } from "./sources";

const source = foundation

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

const QUESTIONS = 10;

const getWordList = () => shuffle(source).slice(0, QUESTIONS);

export const App = () => {
  const [wordList, setWordList] = useState(getWordList());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(wordList[0]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [revelaed, setRevealed] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    setCurrentWord(wordList[currentWordIndex]);
  }, [currentWordIndex]);

  const checkAnswer = () => {
    if (
      currentWord.german
        .split(" / ")
        .map((el) => el.toLowerCase())
        .includes(userInput.toLowerCase()) &&
      userInput !== ""
    ) {
      if (!revelaed) {
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
    <div>
      <h1>English-German Translation Game</h1>

      {currentWordIndex !== QUESTIONS ? (
        <>
          <div>
            <p>Translate the word:</p>
            <p>
              {currentWord && currentWord.english}{" "}
              {revelaed && `(${currentWord.german})`}
            </p>
          </div>
          <div class="user-input">
            <input
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  checkAnswer();
                }
              }}
              type="text"
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={checkAnswer}>Check</button>
          </div>

          <div>
            <p>Score: {score}</p>
            <p>
              Progress: {currentWordIndex + 1}/{wordList.length}
            </p>
          </div>
          <div>
            <p>Click the buttons to add letters:</p>
            {letters.split("").map((letter, index) => (
              <button key={index} onClick={() => handleLetterClick(letter)}>
                {letter}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <p>
            Your result is {score}/{QUESTIONS}
          </p>
          <div class="user-input">
            <button
              onClick={() => {
                reset();
                setWordList(shuffle(wordList));
              }}
            >
              Repeat set
            </button>
            <button
              onClick={() => {
                reset();
                setWordList(getWordList());
              }}
            >
              New set
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
