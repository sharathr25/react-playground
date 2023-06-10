import { useEffect, useState } from "react";
import styles from "./index.module.scss";

const HIDE_TIME_IN_MS = 1000;
const TO_REMEMBER = 2;
const GRID_SIZE = 2;
const NUMBER_OF_OPTIONS = 4;

const getNumbersInRandomOrder = (toRemember, numberOfOptions) => {
  return [0, 1, 1, 0];
};

const MemoryGame = () => {
  const [numbers, setNumbers] = useState(
    getNumbersInRandomOrder(TO_REMEMBER, GRID_SIZE)
  );

  const [guesses, setGuesses] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState(new Set());

  const onClick = (i) => {
    setGuesses((prev) => [...prev, i]);
  };

  useEffect(() => {
    if (guesses.length === TO_REMEMBER) {
      const guessedNumbers = guesses.map((g) => numbers[g]);
      const num0 = guessedNumbers[0];
      if (guessedNumbers.every((gn) => gn === num0))
        setCorrectGuesses(new Set(correctGuesses).add(num0));
      setTimeout(() => setGuesses([]), HIDE_TIME_IN_MS);
    }
  }, [guesses]);

  useEffect(() => {
    if (correctGuesses.size === numbers.length / TO_REMEMBER) {
      alert("YOU WON:)");
      getNumbersInRandomOrder(TO_REMEMBER, GRID_SIZE);
      setCorrectGuesses(new Set());
      setNumbers(getNumbersInRandomOrder(TO_REMEMBER, NUMBER_OF_OPTIONS));
    }
  }, [correctGuesses]);

  return (
    <div className={styles["memory-game"]}>
      <div className={styles.grid}>
        {numbers.map((n, i) => (
          <div
            className={styles["grid-item"]}
            onClick={onClick.bind(null, i)}
            key={`${n} + ${i}`}
          >
            <div
              className={`${styles.inner} ${
                guesses.includes(i) || correctGuesses.has(n)
                  ? styles.show
                  : ""
              }`}
            >
              <div className={styles.frontface}>*</div>
              <div className={styles.backface}>{n}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
