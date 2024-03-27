"use strict";
/** Returns a random int number between minInt (inclusive) and maxInt (inclusive) */
const getRandomNumInRange = (minInt, maxInt) => {
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};
