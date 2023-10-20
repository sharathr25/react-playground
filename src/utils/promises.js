export const sleep = (delay) =>
  new Promise((resolve) => setTimeout(() => resolve(true), delay));
