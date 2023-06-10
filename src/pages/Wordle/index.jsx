import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { getRandomWord } from "./words";

const WORD_LENGTH = 5;
const NUMBER_OF_TRYS = 6;
const DELAY_TO_RESET_GAME = 1000;

const Wordle = () => {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const wordToGuessSet = new Set([...wordToGuess]);
  const wordToGuessSetWithIndex = new Set(
    [...wordToGuess].map((char, idx) => `${char}-${idx}`)
  );

  console.log({ wordToGuess });

  const handleKeyUp = ({ key }) => {
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.substring(0, prev.length - 1));
    } else if (key === "Enter" && currentGuess.length === WORD_LENGTH) {
      const newGuesses = [...guesses];
      newGuesses[newGuesses.length] = currentGuess;
      setGuesses(newGuesses);
      setCurrentGuess("");
    } else if (/[a-z]/.test(key)) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [currentGuess, guesses]);

  useEffect(() => {
    const won = guesses.some((word) => word === wordToGuess);
    const lost = guesses.length === NUMBER_OF_TRYS;
    if (won || lost) {
      setTimeout(() => {
        alert(won ? "YOU WON :)" : "YOU LOST :(");
        setWordToGuess(getRandomWord());
        setGuesses([]);
      }, DELAY_TO_RESET_GAME);
    }
  }, [guesses]);

  return (
    <div className={styles.container}>
      <h1>WORDLE</h1>
      {Array(NUMBER_OF_TRYS)
        .fill("")
        .map((_, i) => (
          <div key={i} className={styles.word}>
            {Array(WORD_LENGTH)
              .fill()
              .map((_, j) => {
                const word =
                  guesses[i] || (i === guesses.length ? currentGuess : "");
                const char = word.charAt(j);
                const charInnerClass = `${styles.inner} ${
                  guesses[i]?.length === WORD_LENGTH ? styles.reveal : ""
                }`;
                const backgroundClrClass = char
                  ? styles["with-blue-background"]
                  : "";
                const charFrontClass = `${styles.front} ${backgroundClrClass}`;
                const charBackClass = `${styles.back} ${backgroundClrClass} ${
                  wordToGuessSet.has(char)
                    ? styles["with-coral-background"]
                    : ""
                } ${
                  wordToGuessSetWithIndex.has(`${char}-${j}`)
                    ? styles["with-green-background"]
                    : ""
                }`;

                return (
                  <div key={j} className={styles.character}>
                    <div className={charInnerClass}>
                      <div className={charFrontClass}>{char}</div>
                      <div className={charBackClass}>{char}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
    </div>
  );
};

export default Wordle;
