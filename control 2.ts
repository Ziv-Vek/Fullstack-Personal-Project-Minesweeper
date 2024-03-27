/** Handles the input from the user */
class UserInputHandler {
  constructor() {}

  public onCellClicked(row: number, column: number) {
    let cellHtmlElement = getCellHtmlElement(row, column);
    let cellData: Cell = gridData.getCellByGrid(row, column);

    if (
      cellData.isRevealed ||
      cellData.currentMark === Mark.Flag ||
      cellData.currentMark === Mark.QuestionMark
    )
      return;

    levelManager.revealeCell(cellHtmlElement, cellData, row, column);
  }

  public onCellMarking(row: number, column: number, eve) {
    eve.preventDefault();

    let cellHtmlElement = getCellHtmlElement(row, column);
    let cellData: Cell = gridData.getCellByGrid(row, column);

    if (cellData.isRevealed) return;

    levelManager.cycleMarking(cellHtmlElement, cellData, row, column);
  }

  public onLevelRestartBtnPress() {
    window.location.reload();
  }

  public onBackToMenuBtnPress() {
    document.location = `./index.html`;
  }

  public onLevelStartBtnPress(
    requiredRows: number,
    requiredColumns: number,
    requiredMines: number
  ) {
    mainMenuHandler.LoadGame(requiredRows, requiredColumns, requiredMines);
  }

  public onCustomLevelBtnPress() {
    mainMenuHandler.toggleCustomGameInfo();
  }

  public onCustomGameSubmit(eve) {
    eve.preventDefault();

    const requiredRows: number = eve.target.elements.rows.value;
    const requiredColumns: number = eve.target.elements.columns.value;
    const requiredMines: number = eve.target.elements.mines.value;

    if (requiredRows < 1 || requiredColumns < 1 || requiredMines < 1) {
      mainMenuHandler.displayCustomNumbersWarning();
      return;
    }

    mainMenuHandler.LoadGame(requiredRows, requiredColumns, requiredMines);
  }
}

/** Responsible for managing the main menu logic */
class MainMenuHandler {
  constructor() {}

  public LoadGame(
    requiredRows: number,
    requiredColumns: number,
    requiredMines: number
  ) {
    let levelRequiredSizeArr: number[] = [
      requiredRows,
      requiredColumns,
      requiredMines,
    ];
    savings.saveToLocalStorage(levelRequiredSizeArr);
    document.location = `./game.html`;
  }

  toggleCustomGameInfo() {
    customGameElement.classList.toggle("custom-game--visible");
  }

  displayCustomNumbersWarning() {}
}

/** Responsible for managing the level gameplay logic */
class LevelManager {
  private totalNumOfMines: number;
  private remainingFlagsIndicator: number;
  private correctFlagsPlaced: number = 0;

  constructor(private requiredNumOfMines: number) {
    this.totalNumOfMines = requiredNumOfMines;
    this.remainingFlagsIndicator = requiredNumOfMines;
    this.renderMinesCounter();
  }

  private renderMinesCounter() {
    mineCounter.innerHTML = `${this.remainingFlagsIndicator}`;
  }

  public cycleMarking(
    cellHtmlElement: HTMLTableCellElement,
    cellData: Cell,
    row: number,
    column: number
  ) {
    switch (cellData.currentMark) {
      case Mark.None:
        tableRenderer.renderCell(
          cellHtmlElement,
          row,
          column,
          "flag",
          ImagesLinks.Flag
        );
        cellData.setMark(Mark.Flag);
        this.remainingFlagsIndicator--;
        this.renderMinesCounter();
        if (cellData.getIsBomb) {
          this.correctFlagsPlaced++;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c9bcf238260cec48d62700fd9ae0ad8e6414316c
          if (
            this.totalNumOfMines === this.correctFlagsPlaced &&
            this.remainingFlagsIndicator === 0
          ) {
<<<<<<< HEAD
=======
          if (this.totalNumOfMines === this.correctFlagsPlaced) {
>>>>>>> b518e7f2699e92d3db55f8d6e92d97a230488b42
=======
>>>>>>> c9bcf238260cec48d62700fd9ae0ad8e6414316c
            this.winSequence();
          }
        }
        break;

      case Mark.Flag:
        tableRenderer.renderCell(
          cellHtmlElement,
          row,
          column,
          "question-mark",
          ImagesLinks.QuestionMark
        );
        cellData.setMark(Mark.QuestionMark);
        this.remainingFlagsIndicator++;
        this.renderMinesCounter();
        if (cellData.getIsBomb) this.correctFlagsPlaced--;
        break;

      case Mark.QuestionMark:
        tableRenderer.renderCell(
          cellHtmlElement,
          row,
          column,
          "default",
          ImagesLinks.None
        );
        cellData.setMark(Mark.None);
        break;

      default:
        throw new Error("No mark found for cellData");
<<<<<<< HEAD
<<<<<<< HEAD
=======
        break;
>>>>>>> b518e7f2699e92d3db55f8d6e92d97a230488b42
=======
>>>>>>> c9bcf238260cec48d62700fd9ae0ad8e6414316c
    }
  }

  public revealeCell(
    cellHtmlElement: HTMLTableCellElement,
    cellData: Cell,
    row: number,
    column: number
  ) {
    if (cellData.getIsBomb) {
      tableRenderer.renderCell(
        cellHtmlElement,
        row,
        column,
        "revealed",
        ImagesLinks.Mine
      );
      this.loseSequence();
    } else {
      let adjacentMinesImgMark: ImagesLinks =
        ImagesLinks["Num" + this.countAdjacentMines(row, column)];

      tableRenderer.renderCell(
        cellHtmlElement,
        row,
        column,
        "revealed",
        adjacentMinesImgMark
      );

      cellData.isRevealed = true;
    }
  }

  private countAdjacentMines(
    selectedCellRow: number,
    selectedCellColumn: number
  ): number {
    let counter: number = 0;

    for (let i = selectedCellRow - 1; i <= selectedCellRow + 1; i++) {
      if (i < 0 || i > gridData.rowsInGrid - 1) continue;

      for (let j = selectedCellColumn - 1; j <= selectedCellColumn + 1; j++) {
        if (j < 0 || j > gridData.columnsInGrid - 1) continue;

        if (gridData.getCellByGrid(i, j).getIsBomb) {
          counter++;
        }
      }
    }

    return counter;
  }

  private winSequence() {
    uiRenderer.toggleLevelFinishedScreen();
    uiRenderer.displayLevelFinishedText(true);
  }

  private loseSequence() {
    uiRenderer.toggleLevelFinishedScreen();
    uiRenderer.displayLevelFinishedText(false);
  }
}

/** Handles the rendering logic for the game table and cells */
class TableRendererHandler {
  private markToCellSizeRatio = 0.9;
  private smallCellSize = 50; // in px
  private largeCellSize = 80; // in px
  private gridResizingThreshold = 10; // num of rows or columns before cells resize

  constructor(numOfRows: number, numOfColumns: number) {
    this.renderCellsTable(numOfRows, numOfColumns);
  }

  private renderCellsTable(numOfRows: number, numOfColumns: number) {
    for (let i = 0; i < numOfRows; i++) {
      cellsTableBody.innerHTML += `<tr class="cells-table__table-row">`;
    }

    let tableRows: NodeListOf<HTMLTableRowElement> = document.querySelectorAll(
      ".cells-table__table-row"
    );

    tableRows.forEach((row) => {
      let cellsHtml: string[] = [];

      for (let j = 0; j < numOfColumns; j++) {
        cellsHtml.push(this.generateCellHtml(row.rowIndex, j, "default", ""));
      }

      row.innerHTML = cellsHtml.join("");
    });
  }

  private generateCellHtml(
    rawIndex: number,
    columnIndex: number,
    cellStatus: string,
    markImg: string
  ): string {
    let cellSize: number;

    cellSize = this.calculateCellSize();

    let html: string = `<td class=
    "cells-table__cell cells-table__cell--${cellStatus}" data-row="${rawIndex}" data-column="${columnIndex}"
    onclick="userInputHandler.onCellClicked(${rawIndex}, ${columnIndex})"
    oncontextmenu="userInputHandler.onCellMarking(${rawIndex}, ${columnIndex}, event)" style="width: ${cellSize}px; height: ${cellSize}px"};" >${markImg}
    </td>
    `;

    return html;
  }

  public renderCell(
    cellHtml: HTMLTableCellElement,
    row: number,
    column: number,
    cellStatus: string,
    markImg: ImagesLinks | string
  ) {
    let imgHtml: string;

    if (markImg === ImagesLinks.None) {
      imgHtml = "";
    } else {
      imgHtml = `<div style="display: grid;"><img class="cells-table__cell__cell-mark" src="${markImg}" alt="mark" style="width: ${
        this.calculateCellSize() * this.markToCellSizeRatio
      }px; justify-self: center; display: grid; align-self: center;"/></div>`;
    }

    let newCellHtml = this.generateCellHtml(row, column, cellStatus, imgHtml);

    cellHtml.outerHTML = `${newCellHtml}`;
  }

  private calculateCellSize(): number {
    if (
      gridData.rowsInGrid >= this.gridResizingThreshold ||
      gridData.columnsInGrid >= this.gridResizingThreshold
    ) {
      return this.smallCellSize;
    } else {
      return this.largeCellSize;
    }
  }
}

/** Handles the rendering logic for the UI and ending/info screens */
class UIRendered {
  constructor() {}

  toggleLevelFinishedScreen() {
    levelEndWrapper.classList.toggle("level-end-wrapper--visible");
  }

  displayLevelFinishedText(isWon: boolean) {
    let resultElement = document.createElement("p");

    if (isWon) {
      resultElement.classList.add(
        "level-end__result-text",
        "level-end__result-text--won"
      );
      resultElement.innerHTML = "Level cleared!";
    } else {
      resultElement.classList.add(
        "level-end__result-text",
        "level-end__result-text--lost"
      );
      resultElement.innerHTML = "Mine hit!";
    }

    levelResultBox.prepend(resultElement);
  }
}

/** Responsible for the saving and loading data logic */
class Savings {
  constructor() {}

  public saveToLocalStorage(levelParametersArr: number[]) {
    try {
      if (!levelParametersArr) {
        throw new Error("levelParametersArr is not valid");
      }
      localStorage.setItem(
        "levelParametersArr",
        JSON.stringify(levelParametersArr)
      );
    } catch (error) {
      console.log(error);
    }
  }

  public getItemsFromLocalStorage(): number[] | string[] {
    const data = localStorage.getItem("levelParametersArr");
    if (!data) throw new Error("data not valid");
    const levelParametersArr = JSON.parse(data);
    return levelParametersArr;
  }
}
