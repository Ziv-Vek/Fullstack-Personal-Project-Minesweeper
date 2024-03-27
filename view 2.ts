enum ImagesLinks {
  None = "",
  Mine = "./images/mine.jpg",
  Flag = "./images/flag.png",
  QuestionMark = "./images/question-mark.png",
  Num0 = "",
  Num1 = "./images/1.png",
  Num2 = "./images/2.png",
  Num3 = "./images/3.png",
  Num4 = "./images/4.png",
  Num5 = "./images/5.png",
  Num6 = "./images/6.png",
  Num7 = "./images/7.png",
  Num8 = "./images/8.png",
}

const cellsTable = document.querySelector(".cells-table") as HTMLTableElement;

if (cellsTable) {
  const cellsTableBody = cellsTable.tBodies.item(0) as HTMLTableSectionElement; // this is required if we want only one tbody, because creating a 'tr' with js creates a new tbody for each 'tr'
}

const mineCounter = document.querySelector(
  ".level-container__level-status__mine-counter"
) as HTMLParagraphElement;
const levelResultBox = document.querySelector(
  ".level-end__box"
) as HTMLDivElement;
const levelEndWrapper = document.querySelector(
  ".level-end-wrapper"
) as HTMLDivElement;
const customGameElement = document.querySelector(
  ".custom-game"
) as HTMLDivElement;

const getCellHtmlElement = (
  row: number,
  column: number
): HTMLTableCellElement => {
  return cellsTable.rows.item(row)!.cells[column] as HTMLTableCellElement;
};
