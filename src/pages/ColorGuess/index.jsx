import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { getRandomHexColor } from "../../utils/strings";
import { ToastContainer, toast } from "react-toastify";

const NUM_OF_OPTIONS = 3;
const RESET_TIME_IN_MS = 2000;

const ColorGuess = () => {
  const [colors, setColors] = useState([]);
  const [correctOption, setCorrectOption] = useState(0);
  const [clicked, setClicked] = useState(false);

  const setGame = () => {
    setColors(
      new Array(NUM_OF_OPTIONS).fill(null).map(() => getRandomHexColor())
    );
    setCorrectOption(Math.floor(Math.random() * NUM_OF_OPTIONS));
    setClicked(false);
  };

  const onClick = (colorOptionIndex) => {
    setClicked(true);
    if (colorOptionIndex === correctOption) toast.success("CORRECT :)");
    else toast.error("WRONG :(");
    setTimeout(setGame, RESET_TIME_IN_MS);
  };

  useEffect(setGame, []);

  const renderColor = (color, i) => (
    <button
      key={color}
      className={styles["btn-option"]}
      onClick={onClick.bind(null, i)}
      disabled={clicked}
    >
      {color}
    </button>
  );

  return (
    <div className={styles.main}>
      <ToastContainer theme="dark" />
      <div
        className={styles["crt-color"]}
        style={{ backgroundColor: colors[correctOption] }}
      />
      <div className={styles["color-options"]}>{colors.map(renderColor)}</div>
    </div>
  );
};

export default ColorGuess;
