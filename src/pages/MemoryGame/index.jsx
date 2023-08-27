import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { getNumbers, shuffleNumbers } from "../../utils/numbers";
import { animalEmojis } from "../../constants/emojis";
import { ToastContainer, toast } from "react-toastify";

const HIDE_TIME_IN_MS = 1000;
const ROWS = 2;
const COLUMNS = 2;
const BOX_SIZE = 75;

const getNumbersToRemember = () => {
  const set1 = getNumbers((ROWS * COLUMNS) / 2);
  const set2 = getNumbers((ROWS * COLUMNS) / 2);
  return shuffleNumbers([...set1, ...set2]);
};

const MemoryGame = () => {
  const [tiles, setTiles] = useState(getNumbersToRemember());
  const [guesses, setGuesses] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState(new Set());

  const onClick = (guess) => {
    setGuesses((guesses) => [...guesses, guess]);
  };

  useEffect(() => {
    if (guesses.length != 2) return;

    const guessedNumbers = guesses.map((g) => tiles[g]);
    if (guessedNumbers[0] == guessedNumbers[1])
      setCorrectGuesses(new Set(correctGuesses).add(guessedNumbers[0]));
    setTimeout(() => setGuesses([]), HIDE_TIME_IN_MS);
  }, [guesses]);

  useEffect(() => {
    if (correctGuesses.size === tiles.length / 2) toast.success("YOU WON :)");
  }, [correctGuesses]);

  const resetGame = () => {
    setGuesses([]);
    setCorrectGuesses(new Set());
    setTiles(getNumbersToRemember());
  };

  useEffect(() => {
    const unsubscribe = toast.onChange(({ status }) => {
      if (status === "removed") resetGame();
    });

    return unsubscribe;
  }, []);

  const renderTile = (n, i) => (
    <div
      className={styles.tile}
      onClick={onClick.bind(null, i)}
      key={`${n}-${i}`}
    >
      <div
        className={`${styles.inner} ${
          guesses.includes(i) || correctGuesses.has(n) ? styles.show : ""
        }`}
      >
        <div className={styles.frontface}>&#128064;</div>
        <div className={styles.backface}>{animalEmojis[n]}</div>
      </div>
    </div>
  );

  return (
    <div className={styles["memory-game"]}>
      <ToastContainer theme="dark" />
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, ${BOX_SIZE}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${BOX_SIZE}px)`,
        }}
      >
        {tiles.map(renderTile)}
      </div>
    </div>
  );
};

export default MemoryGame;
