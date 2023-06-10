import { useEffect, useState } from "react";
import "./index.css";

const HIDE_TIME_IN_MS = 1000;
const TO_REMEMBER = 2;
const GRID_SIZE = 2;

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
    <div className="memory-game">
      <div className="memory-game__grid">
        {numbers.map((n, i) => (
          <div
            className="memory-game__grid-item"
            onClick={onClick.bind(null, i)}
            key={`${n} + ${i}`}
          >
            <div
              className={`memory-game__grid-item-inner ${
                guesses.includes(i) || correctGuesses.has(n)
                  ? "memory-game__grid-item-inner--show"
                  : ""
              }`}
            >
              <div className="memory-game__grid-item-frontface">*</div>
              <div className="memory-game__grid-item-backface">{n}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
