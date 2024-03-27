var ImagesLinks;
(function (ImagesLinks) {
    ImagesLinks["None"] = "";
    ImagesLinks["Mine"] = "./images/mine.jpg";
    ImagesLinks["Flag"] = "./images/flag.png";
    ImagesLinks["QuestionMark"] = "./images/question-mark.png";
    ImagesLinks["Num0"] = "";
    ImagesLinks["Num1"] = "./images/1.png";
    ImagesLinks["Num2"] = "./images/2.png";
    ImagesLinks["Num3"] = "./images/3.png";
    ImagesLinks["Num4"] = "./images/4.png";
    ImagesLinks["Num5"] = "./images/5.png";
    ImagesLinks["Num6"] = "./images/6.png";
    ImagesLinks["Num7"] = "./images/7.png";
    ImagesLinks["Num8"] = "./images/8.png";
})(ImagesLinks || (ImagesLinks = {}));
var cellsTable = document.querySelector(".cells-table");
if (cellsTable) {
    var cellsTableBody = cellsTable.tBodies.item(0); // this is required if we want only one tbody, because creating a 'tr' with js creates a new tbody for each 'tr'
}
var mineCounter = document.querySelector(".level-container__level-status__mine-counter");
var levelResultBox = document.querySelector(".level-end__box");
var levelEndWrapper = document.querySelector(".level-end-wrapper");
var customGameElement = document.querySelector(".custom-game");
var getCellHtmlElement = function (row, column) {
    return cellsTable.rows.item(row).cells[column];
};
