// class Game {
//   public gridData: GridData;
//   public tableRenderer: TableRendererHandler;
//   public userInputHandler: UserInputHandler;
//   public levelManager: LevelManager;

//   constructor(
//     requiredNumOfRows: number,
//     requiredNumOfColumns: number,
//     requiredNumOfMines: number
//   ) {
//     this.init(requiredNumOfRows, requiredNumOfColumns, requiredNumOfMines);
//   }

//   private init(
//     requiredNumOfRows: number,
//     requiredNumOfColumns: number,
//     requiredNumOfMines: number
//   ) {
//     this.gridData = new GridData(
//       requiredNumOfRows,
//       requiredNumOfColumns,
//       requiredNumOfMines
//     );

//     this.tableRenderer = new TableRendererHandler(
//       requiredNumOfRows,
//       requiredNumOfColumns
//     );

//     this.userInputHandler = new UserInputHandler();

//     this.levelManager = new LevelManager(requiredNumOfMines);
//   }
// }

// const game: Game = new Game(3, 4, 5);

// const startGame = (
//   numOfRows: number,
//   numOfColumns: number,
//   numOfMines: number
// ) => {
//   gridData = new GridData(numOfRows, numOfColumns, numOfMines);
// };

function init() {
  let levelData = savings.getItemsFromLocalStorage();

  gridData = new GridData(levelData[0], levelData[1], levelData[2]);
  tableRenderer = new TableRendererHandler(levelData[0], levelData[1]);
  levelManager = new LevelManager(levelData[2]);
}

const savings: Savings = new Savings();
let gridData: GridData;
let tableRenderer: TableRendererHandler;
const userInputHandler: UserInputHandler = new UserInputHandler();
let levelManager: LevelManager;
const uiRenderer: UIRendered = new UIRendered();
init();
