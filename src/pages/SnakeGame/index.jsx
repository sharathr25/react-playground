import React, { useEffect, useReducer, useRef } from "react";
import { getRandomCoord, coords, pointsEqual } from "../../utils/geometry";
import classes from "./index.module.scss";

const SIZE = 10;
const SPEED = 1000;
const DIRECTIONS_MAP = {
  w: [-1, 0],
  s: [1, 0],
  a: [0, -1],
  d: [0, 1],
};

const checkWallCollision = (x, y, size) =>
  x < 0 || x >= size || y < 0 || y >= size;

const checkFruitCollision = pointsEqual;

const checkSnakeSelfCollision = pointsEqual;

const nextState = (oldState) => (newState) => ({ ...oldState, ...newState });

const initialState = {
  snake: [
    [4, 4],
    [5, 4],
    [6, 4],
  ],
  direction: [-1, 0],
  fruit: [0, 0],
  msg: "PRESS START",
};

const Arena = ({ size = SIZE }) => {
  const gameLoopRef = useRef();

  const reducer = (state, action) => {
    switch (action.type) {
      case "GAME_LOOP": {
        const { snake, direction, fruit } = state;
        const newSnake = JSON.parse(JSON.stringify(snake));
        let newFruit = fruit;
        const x = newSnake[0][0] + direction[0];
        const y = newSnake[0][1] + direction[1];

        if (checkWallCollision(x, y, size))
          return nextState(initialState)({ msg: "GAME OVER" });

        if (snake.find((s) => checkSnakeSelfCollision(s)([x, y])))
          return nextState(initialState)({ msg: "GAME OVER" });

        newSnake.unshift([x, y]);
        if (checkFruitCollision([x, y])(fruit)) {
          do newFruit = getRandomCoord(size);
          while (snake.find((s) => checkFruitCollision(s)(newFruit)));
        } else {
          newSnake.pop();
        }

        return nextState(state)({
          snake: newSnake,
          fruit: newFruit,
        });
      }

      case "SET_NEW_DIRECTION":
        return nextState(state)({ direction: action.payload });

      case "START_GAME":
        return nextState(initialState)({ msg: "" });

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
      gameLoopRef.current = requestAnimationFrame(gameLoop(t2));
    } else {
      gameLoopRef.current = requestAnimationFrame(gameLoop(t1));
    }
  };

  const startGame = () => {
    if (!msg) return;
    dispatch({ type: "START_GAME" });
    requestAnimationFrame(gameLoop(0));
  };

  const { snake, fruit, msg } = state;

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => document.removeEventListener("keyup", handleKeyPress);
  }, []);

  useEffect(() => {
    if (msg) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  }, [msg]);

  const getCoordCls = (c) => {
    const isCoordinate = pointsEqual(c);
    const isSnake = snake.find(isCoordinate);
    const isFruit = isCoordinate(fruit);
    if (isSnake) return classes.snake;
    if (isFruit) return classes.fruit;
    return "";
  };

  const renderCoord = (c, i) => {
    return <div key={i} className={`${classes.box} ${getCoordCls(c)}`} />;
  };

  return (
    <div className={classes.main}>
      <div className={classes.arena}>{coords(size).map(renderCoord)}</div>
      <div className={classes.msg}>{msg}</div>
      <button onClick={startGame} className={classes[msg ? "show" : "hide"]}>
        START GAME
      </button>
    </div>
  );
};

export default Arena;
