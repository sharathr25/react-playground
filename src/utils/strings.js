const words = [
  "route",
  "crash",
  "clown",
  "shaky",
  "vegan",
  "power",
  "trust",
  "enjoy",
  "brain",
  "adopt",
  "tower",
  "shade",
  "delay",
  "twist",
  "alert",
  "choke",
  "split",
  "rhyme",
  "muddy",
  "plant",
];
const HEXADECIMALS = "0123456789ABCEF";

export const getRandomWord = () =>
  words[Math.floor(Math.random() * words.length)];

export const wordToCharIdxMap = (word) =>
  [...word].reduce((acc, cur, i) => {
    if (!acc.has(cur)) acc.set(cur, new Set());
    acc.get(cur).add(i);
    return acc;
  }, new Map());

export const getRandomHexColor = () =>
  `#${new Array(6).fill().map(getRandomHexDigit).join("")}`;

const getRandomHexDigit = () =>
  HEXADECIMALS.charAt(Math.floor(Math.random() * HEXADECIMALS.length));
