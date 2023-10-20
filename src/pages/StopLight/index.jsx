import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { sleep } from "../../utils/promises";

const SIGNALS = {
  STOP: "stop",
  READY: "ready",
  GO: "go",
};

const SIGNALS_TO_CLASSES = {
  [SIGNALS.STOP]: "red",
  [SIGNALS.READY]: "yellow",
  [SIGNALS.GO]: "green",
};

const DELAYS = {
  [`${SIGNALS.STOP}-${SIGNALS.READY}`]: 3000,
  [`${SIGNALS.READY}-${SIGNALS.GO}`]: 1000,
  [`${SIGNALS.GO}-${SIGNALS.READY}`]: 3000,
  [`${SIGNALS.READY}-${SIGNALS.STOP}`]: 1000,
};

const SIGNALS_VALUES = Object.values(SIGNALS);

const StopLight = () => {
  const [signal, setSignal] = useState(SIGNALS.STOP);

  const moveTraffic = async () => {
    for (let i = 1; i < SIGNALS_VALUES.length; i++) {
      const nextSignal = SIGNALS_VALUES[i];
      const prevSignal = SIGNALS_VALUES[i - 1];
      await sleep(DELAYS[`${prevSignal}-${nextSignal}`]);
      setSignal(nextSignal);
    }
  };

  const stopTraffic = async () => {
    for (let i = SIGNALS_VALUES.length - 2; i >= 0; i--) {
      const nextSignal = SIGNALS_VALUES[i];
      const prevSignal = SIGNALS_VALUES[i + 1];
      await sleep(DELAYS[`${prevSignal}-${nextSignal}`]);
      setSignal(nextSignal);
    }
  };

  useEffect(() => {
    if (signal === SIGNALS.STOP) moveTraffic();
    else if (signal == SIGNALS.GO) stopTraffic();
  }, [signal]);

  const getClass = (_signal) =>
    `${styles.light} ${
      signal === _signal ? styles[SIGNALS_TO_CLASSES[signal]] : styles.off
    }`;

  return (
    <div className={styles.main}>
      <div className={styles["stop-light"]}>
        <div className={getClass("stop")} />
        <div className={getClass("ready")} />
        <div className={getClass("go")} />
      </div>
    </div>
  );
};

export default StopLight;
