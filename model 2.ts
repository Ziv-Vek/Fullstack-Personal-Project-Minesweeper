enum Mark {
  None,
  Flag,
  QuestionMark,
}

/** Responsible for generating the data of the grid and the cells, and storing that data*/
class GridData {
  private cellsGridArr: Cell[][];

  constructor(
    private numOfRows: number,
    private numOfColumns: number,
    numOfBombs: number
  ) {
    this.cellsGridArr = [];
    this.createGrid(numOfRows, numOfColumns);
    this.setBombsInGrid(numOfRows, numOfColumns, numOfBombs);
  }

  /** Creates a grid of Cells within a given number of rows and columns */
  private createGrid(numOfRows: number, numOfColumns: number) {
    for (let i = 0; i < numOfRows; i++) {
      this.cellsGridArr[i] = [];

      for (let j = 0; j < numOfColumns; j++) {
        this.cellsGridArr[i][j] = new Cell(false, Mark.None, false);
      }
    }
  }

  /** Randomly sets cells in the grid to have bombs in them, according to the wanted number of bombs*/
  private setBombsInGrid(
    numOfRows: number,
    numOfColumns: number,
    numOfBombs: number
  ) {
    let spreadGrid: number[] = [];
    let randNum: number;
    let randSpreadCellNum: number;
    let newBombLocation: number[] = [];

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

      newBombLocation = this.translateSingleIndexToGridIndex(
        randSpreadCellNum,
        numOfColumns
      );

      this.cellsGridArr[newBombLocation[0]][newBombLocation[1]].setIsBomb =
        true;
    }
  }

  private translateSingleIndexToGridIndex(
    singleIndex: number,
    numOfColumns: number
  ): Array<number> {
    return [Math.trunc(singleIndex / numOfColumns), singleIndex % numOfColumns];
  }

  public getCellByGrid(row: number, column: number): Cell {
    return this.cellsGridArr[row][column];
  }

  public get rowsInGrid(): number {
    return this.numOfRows;
  }

  public get columnsInGrid(): number {
    return this.numOfColumns;
  }
}

/** Holds the state of a single cell */
class Cell {
  constructor(
    private isBomb: boolean,
    public currentMark: Mark,
    public isRevealed: boolean
  ) {}

  public get getIsBomb(): boolean {
    return this.isBomb;
  }

  public set setIsBomb(isBomb: boolean) {
    this.isBomb = isBomb;
  }

  public setMark(newMark: Mark) {
    this.currentMark = newMark;
  }
}
