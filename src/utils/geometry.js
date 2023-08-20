export const coords = (size) =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(null))
    .reduce((acc, cur, x) => [...acc, ...cur.map((_, y) => [x, y])], []);

export const getRandomCoord = (limit) => [
  Math.floor(Math.random() * limit),
  Math.floor(Math.random() * limit),
];

export const pointsEqual =
  ([x1, y1]) =>
  ([x2, y2]) =>
    x1 === x2 && y1 === y2;
