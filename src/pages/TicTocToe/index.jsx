import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { ToastContainer, toast } from "react-toastify";

const SIZE = 3;
const TILE_SIZE = 50;
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";
const TOP_LEFT_DIAGONAL = "topLeftDiagonal";
const TOP_RIGHT_DIAGONAL = "topRightDiagonal";
const X = "X";
const O = "O";

const getIndex = ([x, y]) => SIZE * x + y;

const getCoord = (index) => [Math.floor(index / SIZE), index % SIZE];

function* horizontalIterator([x, y]) {
  for (let j = x, k = y; k < SIZE; k++) yield [j, k];
}

function* verticalIterator([x, y]) {
  for (let j = x, k = y; j < SIZE; j++) yield [j, k];
}

function* topLeftDiagonalIterator([x, y]) {
  for (let j = x, k = y; (j < SIZE) & (k < SIZE); j++, k++) yield [j, k];
}

function* topRightDiagonalIterator([x, y]) {
  for (let j = x, k = y; (j >= 0) & (k < SIZE); j--, k++) yield [j, k];
}

const initialTiles = () => new Array(SIZE * SIZE).fill().map(() => "");

const iterators = {
  [HORIZONTAL]: horizontalIterator,
  [VERTICAL]: verticalIterator,
  [TOP_LEFT_DIAGONAL]: topLeftDiagonalIterator,
  [TOP_RIGHT_DIAGONAL]: topRightDiagonalIterator,
};

const TicTocToe = () => {
  const [tiles, setTiles] = useState([]);
  const [mark, setMark] = useState("");
  const [winingTiles, setWiningTiles] = useState([]);
  const [crossLineDirection, setCrossLineDirection] = useState(null);

  const onClick = (i) => {
    setTiles((prev) => prev.map((t, j) => (i === j ? mark : t)));
    setMark((prev) => (prev === X ? O : X));
  };

  const setGame = () => {
    setTiles(initialTiles());
    setMark(X);
    setWiningTiles([]);
    setCrossLineDirection(null);
  };

  const checkWin = () => {
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      for (const direction in iterators) {
        if (tile === "") break;
        const tilesMatching = [];
        const startCoord = getCoord(i);
        const iterator = iterators[direction];
        for (const coord of iterator(startCoord)) {
          const index = getIndex(coord);
          if (tiles[index] === tile) tilesMatching.push(index);
          if (tilesMatching.length === SIZE) {
            toast.success(tile + " WON :)");
            setWiningTiles([...tilesMatching]);
            setCrossLineDirection(direction);
            return;
          }
        }
      }
    }
  };

  const checkDraw = () => {
    if (
      winingTiles.length === 0 &&
      tiles.filter((t) => t !== "").length === SIZE * SIZE
    )
      toast.warn("DRAW :|");
  };

  useEffect(checkWin, [tiles]);

  useEffect(checkDraw, [tiles, winingTiles]);

  useEffect(() => {
    const unsubscribe = toast.onChange(({ status }) => {
      if (status === "removed") setGame();
    });

    return unsubscribe;
  }, []);

  useEffect(setGame, []);

  const renderTile = (tile, i) => (
    <div className={classes.tile} onClick={onClick.bind(null, i)} key={i}>
      {winingTiles.includes(i) && (
        <div className={`${classes.line} ${classes[crossLineDirection]}`} />
      )}
      {tile}
    </div>
  );

  return (
    <div className={classes.ticTocToe}>
      <ToastContainer theme="dark" />
      <div
        className={classes.tiles}
        style={{
          gridTemplateColumns: `repeat(${SIZE}, ${TILE_SIZE}px)`,
          gridTemplateRows: `repeat(${SIZE}, ${TILE_SIZE}px)`,
        }}
      >
        {tiles.map(renderTile)}
      </div>
    </div>
  );
};

export default TicTocToe;
