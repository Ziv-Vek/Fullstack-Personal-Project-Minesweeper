var Mark;
(function (Mark) {
    Mark[Mark["None"] = 0] = "None";
    Mark[Mark["Flag"] = 1] = "Flag";
    Mark[Mark["QuestionMark"] = 2] = "QuestionMark";
})(Mark || (Mark = {}));
/** Responsible for generating the data of the grid and the cells, and storing that data*/
var GridData = /** @class */ (function () {
    function GridData(numOfRows, numOfColumns, numOfBombs) {
        this.numOfRows = numOfRows;
        this.numOfColumns = numOfColumns;
        this.cellsGridArr = [];
        this.createGrid(numOfRows, numOfColumns);
        this.setBombsInGrid(numOfRows, numOfColumns, numOfBombs);
    }
    /** Creates a grid of Cells within a given number of rows and columns */
    GridData.prototype.createGrid = function (numOfRows, numOfColumns) {
        for (var i = 0; i < numOfRows; i++) {
            this.cellsGridArr[i] = [];
            for (var j = 0; j < numOfColumns; j++) {
                this.cellsGridArr[i][j] = new Cell(false, Mark.None, false);
            }
        }
    };
    /** Randomly sets cells in the grid to have bombs in them, according to the wanted number of bombs*/
    GridData.prototype.setBombsInGrid = function (numOfRows, numOfColumns, numOfBombs) {
        var spreadGrid = [];
        var randNum;
        var randSpreadCellNum;
        var newBombLocation = [];
        /* The challenge is to get random numbers in a given grid, without repeating the same number twice (during the Math.Random()).
         I first create a 1D array in the lenght of all cells in the grid */
        for (var i = 0; i < numOfRows * numOfColumns; i++) {
            spreadGrid.push(i);
        }
        /* I get the index randomly, and I use the value in that index item as a place where a bomb will be in the grid.
         I then remove from the 1D array the item according to the random index I got.
         Then, I can repeat the process on the smaller array - get a random index number, but I know I will not have the same value twice. */
        for (var i = 0; i < numOfBombs; i++) {
            randNum = getRandomNumInRange(0, spreadGrid.length - 1);
            randSpreadCellNum = spreadGrid[randNum];
            spreadGrid.splice(randNum, 1);
            newBombLocation = this.translateSingleIndexToGridIndex(randSpreadCellNum, numOfColumns);
            this.cellsGridArr[newBombLocation[0]][newBombLocation[1]].setIsBomb =
                true;
        }
    };
    GridData.prototype.translateSingleIndexToGridIndex = function (singleIndex, numOfColumns) {
        return [Math.trunc(singleIndex / numOfColumns), singleIndex % numOfColumns];
    };
    GridData.prototype.getCellByGrid = function (row, column) {
        return this.cellsGridArr[row][column];
    };
    Object.defineProperty(GridData.prototype, "rowsInGrid", {
        get: function () {
            return this.numOfRows;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridData.prototype, "columnsInGrid", {
        get: function () {
            return this.numOfColumns;
        },
        enumerable: false,
        configurable: true
    });
    return GridData;
}());
/** Holds the state of a single cell */
var Cell = /** @class */ (function () {
    function Cell(isBomb, currentMark, isRevealed) {
        this.isBomb = isBomb;
        this.currentMark = currentMark;
        this.isRevealed = isRevealed;
    }
    Object.defineProperty(Cell.prototype, "getIsBomb", {
        get: function () {
            return this.isBomb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "setIsBomb", {
        set: function (isBomb) {
            this.isBomb = isBomb;
        },
        enumerable: false,
        configurable: true
    });
    Cell.prototype.setMark = function (newMark) {
        this.currentMark = newMark;
    };
    return Cell;
}());
