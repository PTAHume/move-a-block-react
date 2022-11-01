import { MutableRefObject, useRef } from "react";

import ICell from "../interfaces/ICell";

const emptySpace = require("../images/blank.png");
const player = require("../images/player.png");
const box = require("../images/box.png");
const invalid = require("../images/invalid.png");
const obstacle = require("../images/obstacle.png");

const useRightBoundary: any = (): MutableRefObject<number[]> => {
  const rightBoundary: MutableRefObject<number[]> = useRef<number[]>([
    9, 19, 29, 39, 49, 59, 69, 79, 89, 99,
  ]);
  return rightBoundary;
};

const useHandleLeftPressAction = (
  playerLocation: number,
  boxLocations: ICell[],
  currentArrangement: Array<ICell>
) => {
  const playersNewLocation: ICell = currentArrangement[playerLocation - 1];
  if (
    playersNewLocation !== undefined &&
    playersNewLocation.content !== obstacle &&
    useRightBoundary.current.includes(playerLocation - 1) === false
  ) {
    processLeftMovement(boxLocations, currentArrangement, playerLocation);
  } else {
    currentArrangement[playerLocation].content = invalid;
  }
};

const processLeftMovement = (
  boxLocations: ICell[],
  currentArrangement: ICell[],
  playerLocation: number
) => {
  const reverseBadMove: number[] = moveBoxes(boxLocations, currentArrangement);
  movePlayer(currentArrangement, playerLocation, reverseBadMove);
};

const moveBoxes = (boxLocations: ICell[], currentArrangement: ICell[]) => {
  const boxesNewLocations: ICell[] = boxLocations.map<ICell>((cell: ICell) => {
    return currentArrangement[cell.index - 1];
  });
  const reverseBadMove: number[] = [];
  boxesNewLocations.forEach((cell: ICell) => {
    if (
      cell !== undefined &&
      cell.content !== obstacle &&
      useRightBoundary.current.includes(cell.index) === false &&
      cell.content !== box
    ) {
      currentArrangement[cell.index].content = box;
      currentArrangement[cell.index + 1].content = emptySpace;
      reverseBadMove.push(cell.index);
    }
  });
  return reverseBadMove;
};

const movePlayer = (
  currentArrangement: ICell[],
  playerLocation: number,
  reverseBadMove: number[]
) => {
  if (currentArrangement[playerLocation - 1].content !== box) {
    currentArrangement[playerLocation - 1].content = player;
    currentArrangement[playerLocation].content =
      currentArrangement[playerLocation].content === box ? box : emptySpace;
  } else if (currentArrangement[playerLocation - 1].content === box) {
    currentArrangement[playerLocation].content = invalid;
    reverseBadMove.forEach((index: number) => {
      currentArrangement[index].content =
        currentArrangement[index].content === invalid ? invalid : emptySpace;
      currentArrangement[index + 1].content = box;
    });
  }
};

export default useHandleLeftPressAction;
