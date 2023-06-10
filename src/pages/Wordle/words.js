const words = [
  'route',
  'crash',
  'clown',
  'shaky',
  'vegan',
  'power',
  'trust',
  'enjoy',
  'brain',
  'adopt',
  'tower',
  'shade',
  'delay',
  'twist',
  'alert',
  'choke',
  'split',
  'rhyme',
  'muddy',
  'plant'
]

export const getRandomWord = () =>
  words[Math.floor(Math.random() * words.length)]
