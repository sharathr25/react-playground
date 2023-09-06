import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { ToastContainer, toast } from "react-toastify";

const SIZE = 3;
const TILE_SIZE = 50;
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";
const TOP_LEFT_DIAGONAL = "topLeftDiagonal";
const TOP_RIGHT_DIAGONAL = "topRightDiagonal";
const PLAYER1 = "X";
const PLAYER2 = "O";

function* verticalIterator([x, y]) {
  for (let j = x, k = y; k < SIZE; k++) yield [j, k];
}

function* horizontalIterator([x, y]) {
  for (let j = x, k = y; j < SIZE; j++) yield [j, k];
}

function* topLeftDiagonalIterator([x, y]) {
  for (let j = x, k = y; (j < SIZE) & (k < SIZE); j++, k++) yield [j, k];
}

function* topRightDiagonalIterator([x, y]) {
  for (let j = x, k = y; (j >= 0) & (k < SIZE); j--, k++) yield [j, k];
}

const iterators = {
  [HORIZONTAL]: horizontalIterator,
  [VERTICAL]: verticalIterator,
  [TOP_LEFT_DIAGONAL]: topLeftDiagonalIterator,
  [TOP_RIGHT_DIAGONAL]: topRightDiagonalIterator,
};

const TicTocToe = () => {
  const [mark, setMark] = useState(PLAYER1);
  const [markedTiles, setMarkedTiles] = useState({});
  const [strikedTiles, setStrikedTiles] = useState({});

  const onClick = (rowNum, colNum) => {
    setMarkedTiles((prev) => ({ ...prev, [[rowNum, colNum]]: mark }));
    setMark((prevMark) => (prevMark === PLAYER1 ? PLAYER2 : PLAYER1));
  };

  const setGame = () => {
    setMarkedTiles({});
    setStrikedTiles({});
    setMark(PLAYER1);
  };

  const checkWinOrDraw = () => {
    for (const rowCol in markedTiles) {
      const mark = markedTiles[rowCol];
      const srcRowCol = rowCol.split(",").map((rc) => parseInt(rc));
      for (const direction in iterators) {
        const matching = {};
        for (const rowCol of iterators[direction](srcRowCol)) {
          if (markedTiles[rowCol] === mark) matching[rowCol] = mark;
          else break;
        }
        if (Object.keys(matching).length === SIZE) {
          toast.success(`PLAYER ${mark} WON :)`);
          setStrikedTiles({ ...matching, direction });
          return;
        }
      }
    }

    if (Object.keys(markedTiles).length === SIZE * SIZE) toast.warn("DRAW :|");
  };

  useEffect(checkWinOrDraw, [markedTiles]);

  useEffect(() => {
    const unsubscribe = toast.onChange(({ status }) => {
      if (status === "removed") setGame();
    });

    return unsubscribe;
  }, []);

  return (
    <div className={classes.ticTocToe}>
      <ToastContainer theme="dark" />
      {new Array(SIZE).fill().map((_, rowNum) => (
        <div className={classes.row} key={rowNum}>
          {new Array(SIZE).fill().map((_, colNum) => (
            <div
              className={classes.col}
              key={colNum}
              onClick={onClick.bind(null, rowNum, colNum)}
              style={{ "--size": `${TILE_SIZE}px` }}
            >
              {strikedTiles[[rowNum, colNum]] && (
                <div
                  className={`${classes.line} ${
                    classes[strikedTiles.direction]
                  }`}
                />
              )}
              {markedTiles[[rowNum, colNum]]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TicTocToe;
