import { useState } from "react";
import styles from "./index.module.scss";
import { ToastContainer, toast } from "react-toastify";

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const EXPECTED_PASSCODE = [2, 5, 2, 5];
const PASSCODE_LENGTH = 4;

const PassCode = () => {
  const [passcode, setPasscode] = useState([]);

  const onSubmitClick = () => {
    if (passcode.length !== PASSCODE_LENGTH) return;

    if (passcode.join() === EXPECTED_PASSCODE.join()) {
      toast.success("Correct");
      return;
    }

    toast.error("Wrong, Try Again");
  };

  const onNumClick = (n, _e) => {
    setPasscode((prev) => [...prev, n]);
  };

  const onUndoClick = () => {
    const copyPasscode = [...passcode];
    copyPasscode.pop();
    setPasscode(copyPasscode);
  };

  const renderNumBtn = (n) => (
    <button
      className={`${styles.btn} ${n === 0 ? styles.zeroBtn : ""}`}
      key={n}
      onClick={onNumClick.bind(null, n)}
      disabled={passcode.length === PASSCODE_LENGTH}
    >
      {n}
    </button>
  );

  const renderNum = (n, i) => <div key={n + "" + i}>{n}</div>;

  return (
    <div className={styles.container}>
      <ToastContainer theme="dark" />
      <div className={styles.nums}>{passcode.map(renderNum)}</div>
      <div className={styles.numPad}>
        {NUMBERS.map(renderNumBtn)}
        <button
          className={`${styles.btn} ${styles.undoBtn}`}
          onClick={onUndoClick}
          disabled={passcode.length === 0}
        >
          C
        </button>
        <button
          className={`${styles.btn} ${styles.submitBtn}`}
          onClick={onSubmitClick}
          disabled={passcode.length !== PASSCODE_LENGTH}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PassCode;
