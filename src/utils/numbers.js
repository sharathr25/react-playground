export const getNumbers = (count) => new Array(count).fill().map((_, i) => i);

export const shuffleNumbers = (numbers) =>
  numbers.sort(() => Math.random() - 0.5);
