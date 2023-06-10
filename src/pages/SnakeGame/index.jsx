import React, { useEffect, useRef, useState } from 'react'
import * as classes from './index.module.scss'

const coords = size =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(null))
    .reduce((acc, cur, x) => [...acc, ...cur.map((_, y) => [x, y])], [])

const DIRECTIONS_MAP = {
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right'
}

const Arena = ({ size = 10 }) => {
  const [snake, setSnake] = useState({
    body: [
      [4, 4],
      [5, 4],
      [6, 4]
    ],
    direction: 'up'
  })
  const intervalRef = useRef(null)

  const moveInNewDirection = newDirection => {
    setSnake(prev => {
      const { body, direction } = prev
      const newCoords = [...body]
      let [x, y] = newCoords[0]

      if (newDirection === 'up' && direction !== 'down') x -= 1
      else if (newDirection === 'down' && direction !== 'up') x += 1
      else if (newDirection === 'left' && direction !== 'right') y -= 1
      else if (newDirection === 'right' && direction !== 'left') y += 1
      else return prev

      newCoords.pop()
      return { body: [[x, y], ...newCoords], direction: newDirection }
    })
  }

  const moveInSameDirection = () => {
    setSnake(prev => {
      const { body, direction } = prev
      const newCoords = [...body]
      let [x, y] = newCoords[0]

      if (direction === 'up') x -= 1
      else if (direction === 'down') x += 1
      else if (direction === 'left') y -= 1
      else if (direction === 'right') y += 1

      if (x < 0 || x > size - 1 || y < 0 || y > size - 1) {
        alert('OUT!!!')
        clearInterval(intervalRef.current)
        return prev
      }

      newCoords.pop()
      return { body: [[x, y], ...newCoords], direction }
    })
  }

  const handleKeyPress = ({ key }) => {
    moveInNewDirection(DIRECTIONS_MAP[key])
  }

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      moveInSameDirection()
    }, 1000)
  }, [])

  return (
    <div className={classes.arena}>
      {coords(size).map(([x, y], i) => {
        const isSnakeBody = snake.body.find(
          ([snakeX, snakeY]) => x === snakeX && y === snakeY
        )
        const classs = isSnakeBody ? classes.snake : ''
        return (
          <div key={i} className={classs}>
            {x},{y}
          </div>
        )
      })}
    </div>
  )
}

export default Arena
