"use strict";
var Mark;
(function (Mark) {
    Mark[Mark["None"] = 0] = "None";
    Mark[Mark["Flag"] = 1] = "Flag";
    Mark[Mark["QuestionMark"] = 2] = "QuestionMark";
})(Mark || (Mark = {}));
/** Responsible for generating the data of the grid and the cells, and storing that data*/
class GridData {
    constructor(numOfRows, numOfColumns, numOfBombs) {
        this.numOfRows = numOfRows;
        this.numOfColumns = numOfColumns;
        this.cellsGridArr = [];
        this.createGrid(numOfRows, numOfColumns);
        this.setBombsInGrid(numOfRows, numOfColumns, numOfBombs);
    }
    /** Creates a grid of Cells within a given number of rows and columns */
    createGrid(numOfRows, numOfColumns) {
        for (let i = 0; i < numOfRows; i++) {
            this.cellsGridArr[i] = [];
            for (let j = 0; j < numOfColumns; j++) {
                this.cellsGridArr[i][j] = new Cell(false, Mark.None, false);
            }
        }
    }
    /** Randomly sets cells in the grid to have bombs in them, according to the wanted number of bombs*/
    setBombsInGrid(numOfRows, numOfColumns, numOfBombs) {
        let spreadGrid = [];
        let randNum;
        let randSpreadCellNum;
        let newBombLocation = [];
        /* The challenge is to get random numbers in a given grid, without repeating the same number twice (during the Math.Random()).
         I first create a 1D array in the lenght of all cells in the grid */
        for (let i = 0; i < numOfRows * numOfColumns; i++) {
            spreadGrid.push(i);
        }
        /* I get the index randomly, and I use the value in that index item as a place where a bomb will be in the grid.
         I then remove from the 1D array the item according to the random index I got.
         Then, I can repeat the process on the smaller array - get a random index number, but I know I will not have the same value twice. */
        for (let i = 0; i < numOfBombs; i++) {
            randNum = getRandomNumInRange(0, spreadGrid.length - 1);
            randSpreadCellNum = spreadGrid[randNum];
            spreadGrid.splice(randNum, 1);
            newBombLocation = this.translateSingleIndexToGridIndex(randSpreadCellNum, numOfColumns);
            this.cellsGridArr[newBombLocation[0]][newBombLocation[1]].setIsBomb =
                true;
        }
    }
    translateSingleIndexToGridIndex(singleIndex, numOfColumns) {
        return [Math.trunc(singleIndex / numOfColumns), singleIndex % numOfColumns];
    }
    getCellByGrid(row, column) {
        return this.cellsGridArr[row][column];
    }
    get rowsInGrid() {
        return this.numOfRows;
    }
    get columnsInGrid() {
        return this.numOfColumns;
    }
}
/** Holds the state of a single cell */
class Cell {
    constructor(isBomb, currentMark, isRevealed) {
        this.isBomb = isBomb;
        this.currentMark = currentMark;
        this.isRevealed = isRevealed;
    }
    get getIsBomb() {
        return this.isBomb;
    }
    set setIsBomb(isBomb) {
        this.isBomb = isBomb;
    }
    setMark(newMark) {
        this.currentMark = newMark;
    }
}
