import { MutableRefObject, useRef } from "react";

import ICell from "../interfaces/ICell";

const emptySpace = require("../images/blank.png");
const player = require("../images/player.png");
const box = require("../images/box.png");
const invalid = require("../images/invalid.png");
const obstacle = require("../images/obstacle.png");

const useLeftBoundary: any = (): MutableRefObject<number[]> => {
  const leftBoundary: MutableRefObject<number[]> = useRef<number[]>([
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90,
  ]);
  return leftBoundary;
};

const useHandleRightPressAction = (
  playerLocation: number,
  boxLocations: ICell[],
  currentArrangement: Array<ICell>
) => {
  const playersNewLocation: ICell = currentArrangement[playerLocation + 1];
  if (
    playersNewLocation !== undefined &&
    playersNewLocation.content !== obstacle &&
    useLeftBoundary.current.includes(playerLocation + 1) === false
  ) {
    processRightMovement(boxLocations, currentArrangement, playerLocation);
  } else {
    currentArrangement[playerLocation].content = invalid;
  }
};

const processRightMovement = (
  boxLocations: ICell[],
  currentArrangement: ICell[],
  playerLocation: number
) => {
  const reverseBadMove: number[] = moverBoxes(boxLocations, currentArrangement);
  movePlayer(currentArrangement, playerLocation, reverseBadMove);
};

const moverBoxes = (boxLocations: ICell[], currentArrangement: ICell[]) => {
  const boxesNewLocations: ICell[] = boxLocations.map<ICell>((cell: ICell) => {
    return currentArrangement[cell.index + 1];
  });
  const reverseBadMove: number[] = [];
  boxesNewLocations.reverse().forEach((cell: ICell) => {
    if (
      cell !== undefined &&
      cell.content !== obstacle &&
      useLeftBoundary.current.includes(cell.index) === false &&
      cell.content !== box
    ) {
      currentArrangement[cell.index].content = box;
      currentArrangement[cell.index - 1].content = emptySpace;
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
  if (currentArrangement[playerLocation + 1].content !== box) {
    currentArrangement[playerLocation + 1].content = player;
    currentArrangement[playerLocation].content =
      currentArrangement[playerLocation].content === box ? box : emptySpace;
  } else if (currentArrangement[playerLocation + 1].content === box) {
    currentArrangement[playerLocation].content = invalid;
    reverseBadMove.forEach((index: number) => {
      currentArrangement[index].content =
        currentArrangement[index].content === invalid ? invalid : emptySpace;
      currentArrangement[index - 1].content = box;
    });
  }
};

export default useHandleRightPressAction;
