export const getNumbersInRandomOrder = (rows, columns) => {
  const numbers = [];
  for (let number = 0; number < (rows * columns) / 2; number++) {
    for (let i = 0; i < 2; i++) {
      let idx;
      do idx = Math.floor(Math.random() * rows * columns);
      while (numbers[idx] != undefined);
      numbers[idx] = number;
    }
  }
  return numbers;
};
