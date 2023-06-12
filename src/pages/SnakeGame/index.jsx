import React, { useEffect, useReducer, useRef } from "react";
import classes from "./index.module.scss";

const SIZE = 10;
const SPEED = 1000;
const DIRECTIONS_MAP = {
  w: [-1, 0],
  s: [1, 0],
  a: [0, -1],
  d: [0, 1],
};

const coords = (size) =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(null))
    .reduce((acc, cur, x) => [...acc, ...cur.map((_, y) => [x, y])], []);

const getRandomCoord = (limit) => [
  Math.floor(Math.random() * limit),
  Math.floor(Math.random() * limit),
];

const pointsEqual =
  ([x1, y1]) =>
  ([x2, y2]) =>
    x1 === x2 && y1 === y2;

const checkCollision = (x, y, size) => x < 0 || x >= size || y < 0 || y >= size;

const checkFruitCollision = pointsEqual;

const nextState = (oldState) => (newState) => ({ ...oldState, ...newState });

const initialState = {
  snake: [
    [4, 4],
    [5, 4],
    [6, 4],
  ],
  direction: [-1, 0],
  fruit: [0, 0],
  gameOverMsg: "PRESS START",
};

const Arena = ({ size = SIZE }) => {
  const requestRef = useRef();

  const reducer = (state, action) => {
    switch (action.type) {
      case "GAME_LOOP": {
        const { snake, direction, fruit } = state;
        const newSnake = JSON.parse(JSON.stringify(snake));
        let newFruit = fruit;
        const x = newSnake[0][0] + direction[0];
        const y = newSnake[0][1] + direction[1];

        if (checkCollision(x, y, size))
          return nextState(initialState)({ gameOverMsg: "GAME OVER" });

        if (checkFruitCollision([x, y])(fruit)) {
          do newFruit = getRandomCoord(size);
          while (snake.find((s) => checkFruitCollision(s)(newFruit)));
        } else {
          newSnake.pop();
        }

        return nextState(state)({
          snake: [[x, y], ...newSnake],
          fruit: newFruit,
        });
      }

      case "SET_NEW_DIRECTION":
        return nextState(state)({ direction: action.payload });

      case "START_GAME":
        return nextState(initialState)({ gameOverMsg: "" });

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleKeyPress = ({ key }) =>
    key in DIRECTIONS_MAP &&
    dispatch({ type: "SET_NEW_DIRECTION", payload: DIRECTIONS_MAP[key] });

  const gameLoop = (t1) => (t2) => {
    if (t2 - t1 >= SPEED) {
      dispatch({ type: "GAME_LOOP" });
      requestRef.current = requestAnimationFrame(gameLoop(t2));
    } else {
      requestRef.current = requestAnimationFrame(gameLoop(t1));
    }
  };

  const startGame = () => {
    dispatch({ type: "START_GAME" });
    requestAnimationFrame(gameLoop(0));
  };

  const { snake, fruit, gameOverMsg } = state;

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => document.removeEventListener("keyup", handleKeyPress);
  }, []);

  useEffect(() => {
    if (gameOverMsg) {
      cancelAnimationFrame(requestRef.current);
    }
  }, [gameOverMsg]);

  return (
    <div className={classes.main}>
      <div className={classes.arena}>
        {coords(size).map((c, i) => {
          const isCoordinate = pointsEqual(c);
          const isSnakeBody = snake.find((s) => isCoordinate(s));
          const isFruit = isCoordinate(fruit);
          return (
            <div
              key={i}
              className={`${classes.box} ${
                isSnakeBody ? classes.snake : isFruit ? classes.fruit : ""
              }`}
            />
          );
        })}
      </div>
      <div className={classes.msg}>{gameOverMsg}</div>
      <button
        onClick={gameOverMsg ? startGame : () => {}}
        className={gameOverMsg ? classes.show : classes.hide}
      >
        START GAME
      </button>
    </div>
  );
};

export default Arena;
