import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { getRandomWord, wordToCharIdxMap } from "../../utils/strings";

import styles from "./index.module.scss";
import "react-toastify/dist/ReactToastify.css";

const WORD_LENGTH = 5;
const NUMBER_OF_TRYS = 6;

const Wordle = () => {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord());
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const wordToGuessMap = useMemo(
    () => wordToCharIdxMap(wordToGuess),
    [wordToGuess]
  );

  console.log({ wordToGuess });

  const resetGame = () => {
    setWordToGuess(getRandomWord());
    setGuesses([]);
  };

  const handleKeyUp = ({ key }) => {
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.substring(0, prev.length - 1));
    } else if (/[a-z]/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => prev + key);
    } else if (key === "Enter" && currentGuess.length === WORD_LENGTH) {
      setGuesses((prev) => [...prev, currentGuess]);
      setCurrentGuess("");
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [currentGuess]);

  useEffect(() => {
    const won = guesses[guesses.length - 1] === wordToGuess;
    const lost = guesses.length === NUMBER_OF_TRYS;
    if (won) toast.success("YOU WON :)");
    else if (lost) toast.error("YOU LOST :(");
  }, [guesses]);

  useEffect(() => {
    const unsubscribe = toast.onChange(({ status }) => {
      if (status === "removed") resetGame();
    });

    return unsubscribe;
  }, []);

  const getGuessStatusBgClass = (char, index) => {
    const isInWord = wordToGuessMap.has(char);
    const isInWordAtCrtPos = isInWord && wordToGuessMap.get(char).has(index);
    if (isInWordAtCrtPos) return styles["green-bg"];
    if (isInWord) return styles["coral-bg"];
    return styles["gray-bg"];
  };

  const renderChar = (word, reveal, _, idx) => {
    const char = word.charAt(idx);

    return (
      <div key={idx} className={styles.character}>
        <div className={`${styles.inner} ${reveal ? styles.reveal : ""}`}>
          <div className={styles.front}>{char}</div>
          <div className={`${styles.back} ${getGuessStatusBgClass(char, idx)}`}>
            {char}
          </div>
        </div>
      </div>
    );
  };

  const renderWord = (_, idx) => {
    const word = guesses[idx] || (idx === guesses.length ? currentGuess : "");
    const reveal = guesses[idx];

    return (
      <div key={idx} className={styles.word}>
        {Array(WORD_LENGTH).fill().map(renderChar.bind(null, word, reveal))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <ToastContainer theme="dark" />
      <h1>WORDLE</h1>
      {Array(NUMBER_OF_TRYS).fill("").map(renderWord)}
    </div>
  );
};

export default Wordle;
