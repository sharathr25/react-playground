import { useState } from "react";
import styles from "./index.module.scss";

const CircleMarker = () => {
  const [addedPoints, setAddedPoints] = useState([]);
  const [poppedPoints, setPoppedPoints] = useState([]);

  const onClick = ({ clientX, clientY }) => {
    setAddedPoints((prev) => [...prev, { x: clientX - 20, y: clientY - 60 }]);
  };

  const undo = () => {
    if (!addedPoints.length) return;
    const newPoints = [...addedPoints];
    const point = newPoints.pop();
    setPoppedPoints((prev) => [...prev, point]);
    setAddedPoints(newPoints);
  };

  const redo = () => {
    if (!poppedPoints.length) return;
    const newpoppedPoints = [...poppedPoints];
    const point = newpoppedPoints.pop();
    setAddedPoints((prev) => [...prev, point]);
    setPoppedPoints(newpoppedPoints);
  };

  return (
    <div className={styles["circle-marker"]}>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={undo} disabled={!addedPoints.length}>
          undo
        </button>
        <button className={styles.btn} onClick={redo} disabled={!poppedPoints.length}>
          redo
        </button>
      </div>
      <div onClick={onClick} className={styles.circles}>
        {addedPoints.map((p, i) => (
          <div
            className={styles.circle}
            style={{ top: p.y, left: p.x }}
            key={p.x + p.y + i}
          />
        ))}
      </div>
    </div>
  );
};

export default CircleMarker;
