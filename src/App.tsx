import { MutableRefObject, useEffect, useRef, useState } from "react";
import useKeyPress from "./hooks/key-press-handler";
import "./App.css";
import Cell from "./shared/Cell";

function App() {
  const moveUp: boolean = useKeyPress("ArrowUp");
  const moveDown: boolean = useKeyPress("ArrowDown");
  const moveLeft: boolean = useKeyPress("ArrowLeft");
  const moveRight: boolean = useKeyPress("ArrowRight");
  const emptySpace = require("./images/blank.png");
  const player = require("./images/player.png");
  const box = require("./images/box.png");
  const goal = require("./images/goal.png");
  const obstacle = require("./images/obstacle.png");
  const [currentArrangement, setCurrentArrangement]: any[] = useState([
    Array<Cell>(64),
  ]);
  const width: number = 8;
  const leftBoundary: MutableRefObject<number[]> = useRef<number[]>([
    0, 8, 16, 24, 32, 40, 48, 56,
  ]);
  const rightBoundary: MutableRefObject<number[]> = useRef<number[]>([
    7, 15, 23, 31, 39, 47, 55, 63,
  ]);

  useEffect(() => {
    let buildLevel: Array<Cell> = new Array(64)
      .fill(undefined, 0, 64)
      .map(
        (value: any, index: number) =>
          new Cell({ content: emptySpace, index: index })
      );

    buildLevel[10] = new Cell({ content: player, index: 10 });
    buildLevel[37] = new Cell({ content: obstacle, index: 37 });
    buildLevel[27] = new Cell({ content: goal, index: 27 });
    buildLevel[17] = new Cell({ content: box, index: 17 });
    setCurrentArrangement(buildLevel);
  }, [player, obstacle, goal, emptySpace, box]);
  useEffect(() => {
    if (moveUp || moveDown || moveLeft || moveRight) {
      const currentState: Cell[] = currentArrangement;
      const boxLocations: Cell[] = currentState.filter(
        (cell: Cell) => cell.content === box
      );
      const playerLocation: number = currentState.findIndex(
        (value) => value.content === player
      );

      if (moveUp) {
        const playersNewLocation = currentState[playerLocation - width];
        if (
          playersNewLocation !== undefined &&
          playersNewLocation.content !== obstacle
        ) {
          const boxesNewLocations: Cell[] = boxLocations.map<Cell>(
            (cell: Cell) => {
              return currentState[cell.index - width];
            }
          );
          boxesNewLocations.forEach((cell: Cell) => {
            if (cell !== undefined && cell.content !== obstacle) {
              currentState[cell.index].content = box;
              currentState[cell.index + width].content = emptySpace;
            }
          });
          if (currentState[playerLocation - width].content !== box) {
            currentState[playerLocation - width].content = player;
            currentState[playerLocation].content =
              currentState[playerLocation].content === box ? box : emptySpace;
          }
        }
      } else if (moveDown) {
        const playersNewLocation = currentState[playerLocation + width];
        if (
          playersNewLocation !== undefined &&
          playersNewLocation.content !== obstacle
        ) {
          const boxesNewLocations: Cell[] = boxLocations.map<Cell>(
            (cell: Cell) => {
              return currentState[cell.index + width];
            }
          );
          boxesNewLocations.forEach((cell: Cell) => {
            if (cell !== undefined && cell.content !== obstacle) {
              currentState[cell.index].content = box;
              currentState[cell.index - width].content = emptySpace;
            }
          });
          if (currentState[playerLocation + width].content !== box) {
            currentState[playerLocation + width].content = player;
            currentState[playerLocation].content =
              currentState[playerLocation].content === box ? box : emptySpace;
          }
        }
      } else if (moveLeft) {
        const playersNewLocation = currentState[playerLocation - 1];
        if (
          playersNewLocation !== undefined &&
          playersNewLocation.content !== obstacle &&
          rightBoundary.current.includes(playerLocation - 1) === false
        ) {
          let boxesNewLocations: Cell[] = boxLocations.map<Cell>(
            (cell: Cell) => {
              return currentState[cell.index - 1];
            }
          );
          boxesNewLocations.forEach((cell: Cell) => {
            if (
              cell.content !== obstacle &&
              rightBoundary.current.includes(cell.index) === false
            ) {
              currentState[cell.index].content = box;
              currentState[cell.index + 1].content = emptySpace;
            }
          });
          if (currentState[playerLocation - 1].content !== box) {
            currentState[playerLocation - 1].content = player;
            currentState[playerLocation].content =
              currentState[playerLocation].content === box ? box : emptySpace;
          }
        }
      } else if (moveRight) {
        const playersNewLocation = currentState[playerLocation + 1];
        if (
          playersNewLocation !== undefined &&
          playersNewLocation.content !== obstacle &&
          leftBoundary.current.includes(playerLocation + 1) === false
        ) {
          const boxesNewLocations: Cell[] = boxLocations.map<Cell>(
            (cell: Cell) => {
              return currentState[cell.index + 1];
            }
          );
          boxesNewLocations.forEach((cell: Cell) => {
            if (
              cell.content !== obstacle &&
              leftBoundary.current.includes(cell.index) === false
            ) {
              currentState[cell.index].content = box;
              currentState[cell.index - 1].content = emptySpace;
            }
          });
          if (currentState[playerLocation + 1].content !== box) {
            currentState[playerLocation + 1].content = player;
            currentState[playerLocation].content =
              currentState[playerLocation].content === box ? box : emptySpace;
          }
        }
      }

      setCurrentArrangement(currentState);
    }
  }, [
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    emptySpace,
    box,
    currentArrangement,
    player,
    obstacle,
    leftBoundary,
    rightBoundary,
    goal,
  ]);

  return (
    <>
      <div className="app">
        <div className="game">
          {currentArrangement.map((cell: Cell, index: number) => {
            return (
              <div key={index} className="box">
                <img
                  data-cell-id={cell.index}
                  data-cell-index={index}
                  alt={cell.content}
                  src={cell.content}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
