import ICell from "../interfaces/ICell";

const emptySpace = require("../images/blank.png");
const player = require("../images/player.png");
const box = require("../images/box.png");
const invalid = require("../images/invalid.png");
const obstacle = require("../images/obstacle.png");

const useHandleUpPressAction = (
  playerLocation: number,
  boxLocations: ICell[],
  currentArrangement: Array<ICell>,
  width: number
) => {
  const playersNewLocation: ICell = currentArrangement[playerLocation - width];
  if (
    playersNewLocation !== undefined &&
    playersNewLocation.content !== obstacle
  ) {
    processUpMovement(boxLocations, playerLocation, currentArrangement, width);
  } else {
    currentArrangement[playerLocation].content = invalid;
  }
};

const processUpMovement = (
  boxLocations: ICell[],
  playerLocation: number,
  currentArrangement: Array<ICell>,
  width: number
) => {
  const reverseBadMove: number[] = moveBoxes(
    boxLocations,
    currentArrangement,
    width
  );
  movePlayer(currentArrangement, playerLocation, width, reverseBadMove);
};

const moveBoxes = (
  boxLocations: ICell[],
  currentArrangement: ICell[],
  width: number
) => {
  const boxesNewLocations: ICell[] = boxLocations.map<ICell>((cell: ICell) => {
    return currentArrangement[cell.index - width];
  });
  const reverseBadMove: number[] = [];
  boxesNewLocations.forEach((cell: ICell) => {
    if (
      cell !== undefined &&
      cell.content !== obstacle &&
      cell.content !== box
    ) {
      currentArrangement[cell.index].content = box;
      currentArrangement[cell.index + width].content = emptySpace;
      reverseBadMove.push(cell.index);
    }
  });
  return reverseBadMove;
};

const movePlayer = (
  currentArrangement: ICell[],
  playerLocation: number,
  width: number,
  reverseBadMove: number[]
) => {
  if (currentArrangement[playerLocation - width].content !== box) {
    currentArrangement[playerLocation - width].content = player;
    currentArrangement[playerLocation].content =
      currentArrangement[playerLocation].content === box ? box : emptySpace;
  } else if (currentArrangement[playerLocation - width].content === box) {
    currentArrangement[playerLocation].content = invalid;
    reverseBadMove.forEach((index: number) => {
      currentArrangement[index].content =
        currentArrangement[index].content === invalid ? invalid : emptySpace;
      currentArrangement[index + width].content = box;
    });
  }
};

export default useHandleUpPressAction;
