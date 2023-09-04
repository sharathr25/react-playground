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

const initialGrid = () =>
  new Array(SIZE).fill().map(() => new Array(SIZE).fill().map(() => ""));

const iterators = {
  [HORIZONTAL]: horizontalIterator,
  [VERTICAL]: verticalIterator,
  [TOP_LEFT_DIAGONAL]: topLeftDiagonalIterator,
  [TOP_RIGHT_DIAGONAL]: topRightDiagonalIterator,
};

const TicTocToe = () => {
  const [grid, setGrid] = useState([]);
  const [mark, setMark] = useState("");
  const [winingTiles, setWiningTiles] = useState([]);
  const [crossLineDirection, setCrossLineDirection] = useState(null);

  const onClick = (rowNum, colNum) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, _rowNum) =>
        rowNum === _rowNum
          ? [...row].map((col, _colNum) => (colNum === _colNum ? mark : col))
          : [...row]
      )
    );
    setMark((prevMark) => (prevMark === PLAYER1 ? PLAYER2 : PLAYER1));
  };

  const setGame = () => {
    setGrid(initialGrid());
    setMark(PLAYER1);
    setWiningTiles([]);
    setCrossLineDirection(null);
  };

  const checkWin = () => {
    for (let rowNum = 0; rowNum < grid.length; rowNum++) {
      const row = grid[rowNum];
      for (let colNum = 0; colNum < row.length; colNum++) {
        const mark = row[colNum];
        for (const direction in iterators) {
          if (mark === "") break;
          const tilesMatching = [];
          const iterator = iterators[direction];
          for (const [_rowNum, _colNum] of iterator([rowNum, colNum])) {
            if (grid[_rowNum][_colNum] === mark)
              tilesMatching.push(`${_rowNum},${_colNum}`);
            if (tilesMatching.length === SIZE) {
              toast.success(`PLAYER ${mark === PLAYER1 ? " 1" : "2"} WON :)`);
              setWiningTiles([...tilesMatching]);
              setCrossLineDirection(direction);
              return;
            }
          }
        }
      }
    }
  };

  const checkDraw = () => {
    if (winingTiles.length !== 0) return;
    const markedTiles = grid
      .flat()
      .reduce((acc, cur) => (cur === "" ? acc : acc + 1), 0);
    if (markedTiles === SIZE * SIZE) toast.warn("DRAW :|");
  };

  useEffect(checkWin, [grid]);

  useEffect(checkDraw, [grid, winingTiles]);

  useEffect(() => {
    const unsubscribe = toast.onChange(({ status }) => {
      if (status === "removed") setGame();
    });

    return unsubscribe;
  }, []);

  useEffect(setGame, []);

  return (
    <div className={classes.ticTocToe}>
      <ToastContainer theme="dark" />
      {grid.map((row, rowNum) => (
        <div className={classes.row} key={rowNum}>
          {row.map((col, colNum) => (
            <div
              className={classes.col}
              key={colNum}
              onClick={onClick.bind(null, rowNum, colNum)}
              style={{ "--size": `${TILE_SIZE}px` }}
            >
              {winingTiles.includes(`${rowNum},${colNum}`) && (
                <div
                  className={`${classes.line} ${classes[crossLineDirection]}`}
                />
              )}
              {col}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TicTocToe;
