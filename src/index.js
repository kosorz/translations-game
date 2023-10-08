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
    <div>

      {currentWordIndex !== QUESTIONS ? (
        <>
          <p class="progress">
            {currentWordIndex + 1}/{wordList.length}
          </p>
        
          <div>
            <h2>
              {currentWord && currentWord.english}<p>{' '}{revealed && `(${currentWord.german})`}</p>
            </h2>
            
          </div>
          <div class="letters">
            {letters.split("").map((letter, index) => (
              <button key={index} onClick={() => handleLetterClick(letter)}>
                {letter}
              </button>
            ))}
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

          <p class="score">Score: {score}</p>
        </>
      ) : (
        <div>
          <p class="score">
            {score}/{QUESTIONS}
          </p>
          <div class="user-actions">
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
