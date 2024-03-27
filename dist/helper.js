/** Returns a random int number between minInt (inclusive) and maxInt (inclusive) */
var getRandomNumInRange = function (minInt, maxInt) {
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};
