import { useEffect, useState } from "react";
import "./index.css";

const HEXADECIMALS = "0123456789ABCEF";
const NUM_OF_OPTIONS = 3;

const getRandomHexColor = () =>
  `#${new Array(6)
    .fill()
    .map(() =>
      HEXADECIMALS.charAt(Math.floor(Math.random() * HEXADECIMALS.length))
    )
    .join("")}`;

const ColorGuess = () => {
  const [colors, setColors] = useState([]);
  const [correctOption, setCorrectOption] = useState(0);
  const [status, setStatus] = useState();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setGame();
  }, []);

  const onClick = (colorOptionIndex) => {
    setClicked(true);
    if (colorOptionIndex === correctOption) setStatus("CORRECT :)");
    else setStatus("WRONG :(");
    setTimeout(setGame, 2000);
  };

  const setGame = () => {
    setColors(
      new Array(NUM_OF_OPTIONS).fill(null).map(() => getRandomHexColor())
    );
    setCorrectOption(Math.floor(Math.random() * NUM_OF_OPTIONS));
    setStatus(null);
    setClicked(false);
  };

  return (
    <div className="main">
      <div
        className="crt-color"
        style={{ backgroundColor: colors[correctOption] }}
      />
      <div className="color-options">
        {colors.map((c, i) => (
          <button
            key={c}
            className="btn-option"
            onClick={onClick.bind(null, i)}
            disabled={clicked}
          >
            {c}
          </button>
        ))}
      </div>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ColorGuess;
