"use strict";
/** Handles the input from the user */
class UserInputHandler {
    constructor() { }
    onCellClicked(row, column) {
        let cellHtmlElement = getCellHtmlElement(row, column);
        let cellData = gridData.getCellByGrid(row, column);
        if (cellData.isRevealed ||
            cellData.currentMark === Mark.Flag ||
            cellData.currentMark === Mark.QuestionMark)
            return;
        levelManager.revealeCell(cellHtmlElement, cellData, row, column);
    }
    onCellMarking(row, column, eve) {
        eve.preventDefault();
        let cellHtmlElement = getCellHtmlElement(row, column);
        let cellData = gridData.getCellByGrid(row, column);
        if (cellData.isRevealed)
            return;
        levelManager.cycleMarking(cellHtmlElement, cellData, row, column);
    }
    onLevelRestartBtnPress() {
        window.location.reload();
    }
    onBackToMenuBtnPress() {
        document.location = `./index.html`;
    }
    onLevelStartBtnPress(requiredRows, requiredColumns, requiredMines) {
        mainMenuHandler.LoadGame(requiredRows, requiredColumns, requiredMines);
    }
    onCustomLevelBtnPress() {
        mainMenuHandler.toggleCustomGameInfo();
    }
    onCustomGameSubmit(eve) {
        eve.preventDefault();
        const requiredRows = eve.target.elements.rows.value;
        const requiredColumns = eve.target.elements.columns.value;
        const requiredMines = eve.target.elements.mines.value;
        if (requiredRows < 1 || requiredColumns < 1 || requiredMines < 1) {
            mainMenuHandler.displayCustomNumbersWarning();
            return;
        }
        mainMenuHandler.LoadGame(requiredRows, requiredColumns, requiredMines);
    }
}
/** Responsible for managing the main menu logic */
class MainMenuHandler {
    constructor() { }
    LoadGame(requiredRows, requiredColumns, requiredMines) {
        let levelRequiredSizeArr = [
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
    displayCustomNumbersWarning() { }
}
/** Responsible for managing the level gameplay logic */
class LevelManager {
    constructor(requiredNumOfMines) {
        this.requiredNumOfMines = requiredNumOfMines;
        this.correctFlagsPlaced = 0;
        this.totalNumOfMines = requiredNumOfMines;
        this.remainingFlagsIndicator = requiredNumOfMines;
        this.renderMinesCounter();
    }
    renderMinesCounter() {
        mineCounter.innerHTML = `${this.remainingFlagsIndicator}`;
    }
    cycleMarking(cellHtmlElement, cellData, row, column) {
        switch (cellData.currentMark) {
            case Mark.None:
                tableRenderer.renderCell(cellHtmlElement, row, column, "flag", ImagesLinks.Flag);
                cellData.setMark(Mark.Flag);
                this.remainingFlagsIndicator--;
                this.renderMinesCounter();
                if (cellData.getIsBomb) {
                    this.correctFlagsPlaced++;
                    if (this.totalNumOfMines === this.correctFlagsPlaced &&
                        this.remainingFlagsIndicator === 0) {
                        this.winSequence();
                    }
                }
                break;
            case Mark.Flag:
                tableRenderer.renderCell(cellHtmlElement, row, column, "question-mark", ImagesLinks.QuestionMark);
                cellData.setMark(Mark.QuestionMark);
                this.remainingFlagsIndicator++;
                this.renderMinesCounter();
                if (cellData.getIsBomb)
                    this.correctFlagsPlaced--;
                break;
            case Mark.QuestionMark:
                tableRenderer.renderCell(cellHtmlElement, row, column, "default", ImagesLinks.None);
                cellData.setMark(Mark.None);
                break;
            default:
                throw new Error("No mark found for cellData");
        }
    }
    revealeCell(cellHtmlElement, cellData, row, column) {
        if (cellData.getIsBomb) {
            tableRenderer.renderCell(cellHtmlElement, row, column, "revealed", ImagesLinks.Mine);
            this.loseSequence();
        }
        else {
            let adjacentMinesImgMark = ImagesLinks["Num" + this.countAdjacentMines(row, column)];
            tableRenderer.renderCell(cellHtmlElement, row, column, "revealed", adjacentMinesImgMark);
            cellData.isRevealed = true;
        }
    }
    countAdjacentMines(selectedCellRow, selectedCellColumn) {
        let counter = 0;
        for (let i = selectedCellRow - 1; i <= selectedCellRow + 1; i++) {
            if (i < 0 || i > gridData.rowsInGrid - 1)
                continue;
            for (let j = selectedCellColumn - 1; j <= selectedCellColumn + 1; j++) {
                if (j < 0 || j > gridData.columnsInGrid - 1)
                    continue;
                if (gridData.getCellByGrid(i, j).getIsBomb) {
                    counter++;
                }
            }
        }
        return counter;
    }
    winSequence() {
        uiRenderer.toggleLevelFinishedScreen();
        uiRenderer.displayLevelFinishedText(true);
    }
    loseSequence() {
        uiRenderer.toggleLevelFinishedScreen();
        uiRenderer.displayLevelFinishedText(false);
    }
}
/** Handles the rendering logic for the game table and cells */
class TableRendererHandler {
    constructor(numOfRows, numOfColumns) {
        this.markToCellSizeRatio = 0.9;
        this.smallCellSize = 50; // in px
        this.largeCellSize = 80; // in px
        this.gridResizingThreshold = 10; // num of rows or columns before cells resize
        this.renderCellsTable(numOfRows, numOfColumns);
    }
    renderCellsTable(numOfRows, numOfColumns) {
        for (let i = 0; i < numOfRows; i++) {
            cellsTableBody.innerHTML += `<tr class="cells-table__table-row">`;
        }
        let tableRows = document.querySelectorAll(".cells-table__table-row");
        tableRows.forEach((row) => {
            let cellsHtml = [];
            for (let j = 0; j < numOfColumns; j++) {
                cellsHtml.push(this.generateCellHtml(row.rowIndex, j, "default", ""));
            }
            row.innerHTML = cellsHtml.join("");
        });
    }
    generateCellHtml(rawIndex, columnIndex, cellStatus, markImg) {
        let cellSize;
        cellSize = this.calculateCellSize();
        let html = `<td class=
    "cells-table__cell cells-table__cell--${cellStatus}" data-row="${rawIndex}" data-column="${columnIndex}"
    onclick="userInputHandler.onCellClicked(${rawIndex}, ${columnIndex})"
    oncontextmenu="userInputHandler.onCellMarking(${rawIndex}, ${columnIndex}, event)" style="width: ${cellSize}px; height: ${cellSize}px"};" >${markImg}
    </td>
    `;
        return html;
    }
    renderCell(cellHtml, row, column, cellStatus, markImg) {
        let imgHtml;
        if (markImg === ImagesLinks.None) {
            imgHtml = "";
        }
        else {
            imgHtml = `<div style="display: grid;"><img class="cells-table__cell__cell-mark" src="${markImg}" alt="mark" style="width: ${this.calculateCellSize() * this.markToCellSizeRatio}px; justify-self: center; display: grid; align-self: center;"/></div>`;
        }
        let newCellHtml = this.generateCellHtml(row, column, cellStatus, imgHtml);
        cellHtml.outerHTML = `${newCellHtml}`;
    }
    calculateCellSize() {
        if (gridData.rowsInGrid >= this.gridResizingThreshold ||
            gridData.columnsInGrid >= this.gridResizingThreshold) {
            return this.smallCellSize;
        }
        else {
            return this.largeCellSize;
        }
    }
}
/** Handles the rendering logic for the UI and ending/info screens */
class UIRendered {
    constructor() { }
    toggleLevelFinishedScreen() {
        levelEndWrapper.classList.toggle("level-end-wrapper--visible");
    }
    displayLevelFinishedText(isWon) {
        let resultElement = document.createElement("p");
        if (isWon) {
            resultElement.classList.add("level-end__result-text", "level-end__result-text--won");
            resultElement.innerHTML = "Level cleared!";
        }
        else {
            resultElement.classList.add("level-end__result-text", "level-end__result-text--lost");
            resultElement.innerHTML = "Mine hit!";
        }
        levelResultBox.prepend(resultElement);
    }
}
/** Responsible for the saving and loading data logic */
class Savings {
    constructor() { }
    saveToLocalStorage(levelParametersArr) {
        try {
            if (!levelParametersArr) {
                throw new Error("levelParametersArr is not valid");
            }
            localStorage.setItem("levelParametersArr", JSON.stringify(levelParametersArr));
        }
        catch (error) {
            console.log(error);
        }
    }
    getItemsFromLocalStorage() {
        const data = localStorage.getItem("levelParametersArr");
        if (!data)
            throw new Error("data not valid");
        const levelParametersArr = JSON.parse(data);
        return levelParametersArr;
    }
}
