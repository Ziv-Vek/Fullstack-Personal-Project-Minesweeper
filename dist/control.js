/** Handles the input from the user */
var UserInputHandler = /** @class */ (function () {
    function UserInputHandler() {
    }
    UserInputHandler.prototype.onCellClicked = function (row, column) {
        var cellHtmlElement = getCellHtmlElement(row, column);
        var cellData = gridData.getCellByGrid(row, column);
        if (cellData.isRevealed ||
            cellData.currentMark === Mark.Flag ||
            cellData.currentMark === Mark.QuestionMark)
            return;
        levelManager.revealeCell(cellHtmlElement, cellData, row, column);
    };
    UserInputHandler.prototype.onCellMarking = function (row, column, eve) {
        eve.preventDefault();
        var cellHtmlElement = getCellHtmlElement(row, column);
        var cellData = gridData.getCellByGrid(row, column);
        if (cellData.isRevealed)
            return;
        levelManager.cycleMarking(cellHtmlElement, cellData, row, column);
    };
    UserInputHandler.prototype.onLevelRestartBtnPress = function () {
        window.location.reload();
    };
    UserInputHandler.prototype.onBackToMenuBtnPress = function () {
        document.location = "./index.html";
    };
    UserInputHandler.prototype.onLevelStartBtnPress = function (requiredRows, requiredColumns, requiredMines) {
        mainMenuHandler.LoadGame(requiredRows, requiredColumns, requiredMines);
    };
    UserInputHandler.prototype.onCustomLevelBtnPress = function () {
        mainMenuHandler.toggleCustomGameInfo();
    };
    UserInputHandler.prototype.onCustomGameSubmit = function (eve) {
        eve.preventDefault();
        var requiredRows = eve.target.elements.rows.value;
        var requiredColumns = eve.target.elements.columns.value;
        var requiredMines = eve.target.elements.mines.value;
        if (requiredRows < 1 || requiredColumns < 1 || requiredMines < 1) {
            mainMenuHandler.displayCustomNumbersWarning();
            return;
        }
        mainMenuHandler.LoadGame(requiredRows, requiredColumns, requiredMines);
    };
    return UserInputHandler;
}());
/** Responsible for managing the main menu logic */
var MainMenuHandler = /** @class */ (function () {
    function MainMenuHandler() {
    }
    MainMenuHandler.prototype.LoadGame = function (requiredRows, requiredColumns, requiredMines) {
        var levelRequiredSizeArr = [
            requiredRows,
            requiredColumns,
            requiredMines,
        ];
        savings.saveToLocalStorage(levelRequiredSizeArr);
        document.location = "./game.html";
    };
    MainMenuHandler.prototype.toggleCustomGameInfo = function () {
        customGameElement.classList.toggle("custom-game--visible");
    };
    MainMenuHandler.prototype.displayCustomNumbersWarning = function () { };
    return MainMenuHandler;
}());
/** Responsible for managing the level gameplay logic */
var LevelManager = /** @class */ (function () {
    function LevelManager(requiredNumOfMines) {
        this.requiredNumOfMines = requiredNumOfMines;
        this.correctFlagsPlaced = 0;
        this.totalNumOfMines = requiredNumOfMines;
        this.remainingFlagsIndicator = requiredNumOfMines;
        this.renderMinesCounter();
    }
    LevelManager.prototype.renderMinesCounter = function () {
        mineCounter.innerHTML = "" + this.remainingFlagsIndicator;
    };
    LevelManager.prototype.cycleMarking = function (cellHtmlElement, cellData, row, column) {
        switch (cellData.currentMark) {
            case Mark.None:
                tableRenderer.renderCell(cellHtmlElement, row, column, "flag", ImagesLinks.Flag);
                cellData.setMark(Mark.Flag);
                this.remainingFlagsIndicator--;
                this.renderMinesCounter();
                if (cellData.getIsBomb) {
                    this.correctFlagsPlaced++;
<<<<<<< HEAD
<<<<<<< HEAD
                    if (this.totalNumOfMines === this.correctFlagsPlaced &&
                        this.remainingFlagsIndicator === 0) {
=======
                    if (this.totalNumOfMines === this.correctFlagsPlaced) {
>>>>>>> b518e7f2699e92d3db55f8d6e92d97a230488b42
=======
                    if (this.totalNumOfMines === this.correctFlagsPlaced &&
                        this.remainingFlagsIndicator === 0) {
>>>>>>> c9bcf238260cec48d62700fd9ae0ad8e6414316c
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
                break;
>>>>>>> b518e7f2699e92d3db55f8d6e92d97a230488b42
=======
>>>>>>> c9bcf238260cec48d62700fd9ae0ad8e6414316c
        }
    };
    LevelManager.prototype.revealeCell = function (cellHtmlElement, cellData, row, column) {
        if (cellData.getIsBomb) {
            tableRenderer.renderCell(cellHtmlElement, row, column, "revealed", ImagesLinks.Mine);
            this.loseSequence();
        }
        else {
            var adjacentMinesImgMark = ImagesLinks["Num" + this.countAdjacentMines(row, column)];
            tableRenderer.renderCell(cellHtmlElement, row, column, "revealed", adjacentMinesImgMark);
            cellData.isRevealed = true;
        }
    };
    LevelManager.prototype.countAdjacentMines = function (selectedCellRow, selectedCellColumn) {
        var counter = 0;
        for (var i = selectedCellRow - 1; i <= selectedCellRow + 1; i++) {
            if (i < 0 || i > gridData.rowsInGrid - 1)
                continue;
            for (var j = selectedCellColumn - 1; j <= selectedCellColumn + 1; j++) {
                if (j < 0 || j > gridData.columnsInGrid - 1)
                    continue;
                if (gridData.getCellByGrid(i, j).getIsBomb) {
                    counter++;
                }
            }
        }
        return counter;
    };
    LevelManager.prototype.winSequence = function () {
        uiRenderer.toggleLevelFinishedScreen();
        uiRenderer.displayLevelFinishedText(true);
    };
    LevelManager.prototype.loseSequence = function () {
        uiRenderer.toggleLevelFinishedScreen();
        uiRenderer.displayLevelFinishedText(false);
    };
    return LevelManager;
}());
/** Handles the rendering logic for the game table and cells */
var TableRendererHandler = /** @class */ (function () {
    function TableRendererHandler(numOfRows, numOfColumns) {
        this.markToCellSizeRatio = 0.9;
        this.smallCellSize = 50; // in px
        this.largeCellSize = 80; // in px
        this.gridResizingThreshold = 10; // num of rows or columns before cells resize
        this.renderCellsTable(numOfRows, numOfColumns);
    }
    TableRendererHandler.prototype.renderCellsTable = function (numOfRows, numOfColumns) {
        var _this = this;
        for (var i = 0; i < numOfRows; i++) {
            cellsTableBody.innerHTML += "<tr class=\"cells-table__table-row\">";
        }
        var tableRows = document.querySelectorAll(".cells-table__table-row");
        tableRows.forEach(function (row) {
            var cellsHtml = [];
            for (var j = 0; j < numOfColumns; j++) {
                cellsHtml.push(_this.generateCellHtml(row.rowIndex, j, "default", ""));
            }
            row.innerHTML = cellsHtml.join("");
        });
    };
    TableRendererHandler.prototype.generateCellHtml = function (rawIndex, columnIndex, cellStatus, markImg) {
        var cellSize;
        cellSize = this.calculateCellSize();
        var html = "<td class=\n    \"cells-table__cell cells-table__cell--" + cellStatus + "\" data-row=\"" + rawIndex + "\" data-column=\"" + columnIndex + "\"\n    onclick=\"userInputHandler.onCellClicked(" + rawIndex + ", " + columnIndex + ")\"\n    oncontextmenu=\"userInputHandler.onCellMarking(" + rawIndex + ", " + columnIndex + ", event)\" style=\"width: " + cellSize + "px; height: " + cellSize + "px\"};\" >" + markImg + "\n    </td>\n    ";
        return html;
    };
    TableRendererHandler.prototype.renderCell = function (cellHtml, row, column, cellStatus, markImg) {
        var imgHtml;
        if (markImg === ImagesLinks.None) {
            imgHtml = "";
        }
        else {
            imgHtml = "<div style=\"display: grid;\"><img class=\"cells-table__cell__cell-mark\" src=\"" + markImg + "\" alt=\"mark\" style=\"width: " + this.calculateCellSize() * this.markToCellSizeRatio + "px; justify-self: center; display: grid; align-self: center;\"/></div>";
        }
        var newCellHtml = this.generateCellHtml(row, column, cellStatus, imgHtml);
        cellHtml.outerHTML = "" + newCellHtml;
    };
    TableRendererHandler.prototype.calculateCellSize = function () {
        if (gridData.rowsInGrid >= this.gridResizingThreshold ||
            gridData.columnsInGrid >= this.gridResizingThreshold) {
            return this.smallCellSize;
        }
        else {
            return this.largeCellSize;
        }
    };
    return TableRendererHandler;
}());
/** Handles the rendering logic for the UI and ending/info screens */
var UIRendered = /** @class */ (function () {
    function UIRendered() {
    }
    UIRendered.prototype.toggleLevelFinishedScreen = function () {
        levelEndWrapper.classList.toggle("level-end-wrapper--visible");
    };
    UIRendered.prototype.displayLevelFinishedText = function (isWon) {
        var resultElement = document.createElement("p");
        if (isWon) {
            resultElement.classList.add("level-end__result-text", "level-end__result-text--won");
            resultElement.innerHTML = "Level cleared!";
        }
        else {
            resultElement.classList.add("level-end__result-text", "level-end__result-text--lost");
            resultElement.innerHTML = "Mine hit!";
        }
        levelResultBox.prepend(resultElement);
    };
    return UIRendered;
}());
/** Responsible for the saving and loading data logic */
var Savings = /** @class */ (function () {
    function Savings() {
    }
    Savings.prototype.saveToLocalStorage = function (levelParametersArr) {
        try {
            if (!levelParametersArr) {
                throw new Error("levelParametersArr is not valid");
            }
            localStorage.setItem("levelParametersArr", JSON.stringify(levelParametersArr));
        }
        catch (error) {
            console.log(error);
        }
    };
    Savings.prototype.getItemsFromLocalStorage = function () {
        var data = localStorage.getItem("levelParametersArr");
        if (!data)
            throw new Error("data not valid");
        var levelParametersArr = JSON.parse(data);
        return levelParametersArr;
    };
    return Savings;
}());
