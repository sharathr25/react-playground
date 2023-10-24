import { useState } from "react";

import styles from "./index.module.scss";

import hole from "../../assets/hole.png";
import mole from "../../assets/mole.png";

const SIZE = 9; // 3 x 3
const SPEED = 1000;

const WackAMole = () => {
  const [moles, setMoles] = useState(Array(SIZE).fill());
  const [score, setScore] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setMoles((moles) =>
        moles.map((_, i) => Math.floor(Math.random() * SIZE) === i)
      );
    }, SPEED);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  const addScore = (index) => {
    setScore((s) => s + 1);
    setMoles((moles) =>
      moles.map((isMole, i) => (index === i ? false : isMole))
    );
  };

  return (
    <div className={styles.main}>
      <h1>SCORE: {score}</h1>
      <div className={styles["holes-mole"]}>
        {moles.map((isMole, i) =>
          isMole ? (
            <img src={mole} key={i} onClick={addScore.bind(null, i)} />
          ) : (
            <img src={hole} key={i} />
          )
        )}
      </div>
    </div>
  );
};

export default WackAMole;
