/** Returns a random int number between minInt (inclusive) and maxInt (inclusive) */
const getRandomNumInRange = (minInt: number, maxInt: number): number => {
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};
