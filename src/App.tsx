import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import useKeyPress from "./hooks/key-press-handler";
import "./App.css";
import { UserPreferences } from "typescript";

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
    Array<string>(64),
  ]);
  const width: number = 8;
  const leftBoundary: MutableRefObject<number[]> = useRef<number[]>([
    0, 8, 16, 24, 32, 40, 48, 56,
  ]);
  const rightBoundary: MutableRefObject<number[]> = useRef<number[]>([
    7, 15, 23, 31, 39, 47, 55, 63,
  ]);

  useEffect(() => {
    let buildLevel: Array<string> = new Array<string>(64);
    buildLevel.fill(emptySpace, 0, 64);
    buildLevel[10] = player;
    buildLevel[37] = obstacle;
    buildLevel[27] = goal;
    buildLevel[17] = box;
    setCurrentArrangement(buildLevel);
  }, [player, obstacle, goal, emptySpace, box]);
  useEffect(() => {
    if (moveUp || moveDown || moveLeft || moveRight) {
      const currentState = currentArrangement;
      const boxLocation = currentState.indexOf(box);
      const playerLocation = currentState.indexOf(player);

      if (moveUp) {
        let playersNewLocation = currentState[playerLocation - width];
        if (
          playersNewLocation !== obstacle &&
          playersNewLocation !== undefined
        ) {
          let boxesNewLocation = currentState[boxLocation - width];
          if (boxesNewLocation !== obstacle && boxesNewLocation !== undefined) {
            currentState[boxLocation - width] = box;
            currentState[boxLocation] = emptySpace;
          }
          if (currentState[playerLocation - width] !== box) {
            currentState[playerLocation - width] = player;
            currentState[playerLocation] =
              currentState[playerLocation] === box ? box : emptySpace;
          }
        }
      }

      if (moveDown) {
        let playersNewLocation = currentState[playerLocation + width];
        if (
          playersNewLocation !== obstacle &&
          playersNewLocation !== undefined
        ) {
          let boxesNewLocation = currentState[boxLocation + width];
          if (boxesNewLocation !== obstacle && boxesNewLocation !== undefined) {
            currentState[boxLocation + width] = box;
            currentState[boxLocation] = emptySpace;
          }
          if (currentState[playerLocation + width] !== box) {
            currentState[playerLocation + width] = player;
            currentState[playerLocation] =
              currentState[playerLocation] === box ? box : emptySpace;
          }
        }
      }

      if (moveLeft) {
        let playersNewLocation = currentState[playerLocation - 1];
        if (
          playersNewLocation !== obstacle &&
          playersNewLocation !== undefined &&
          rightBoundary.current.includes(playerLocation - 1) === false
        ) {
          let boxesNewLocation = currentState[boxLocation - 1];
          if (
            boxesNewLocation !== obstacle &&
            rightBoundary.current.includes(boxLocation - 1) === false
          ) {
            currentState[boxLocation - 1] = box;
            currentState[boxLocation] = emptySpace;
          }
          if (currentState[playerLocation - 1] !== box) {
            currentState[playerLocation - 1] = player;
            currentState[playerLocation] =
              currentState[playerLocation] === box ? box : emptySpace;
          }
        }
      }

      if (moveRight) {
        let playersNewLocation = currentState[playerLocation + 1];
        if (
          playersNewLocation !== obstacle &&
          playersNewLocation !== undefined &&
          leftBoundary.current.includes(playerLocation + 1) === false
        ) {
          let boxesNewLocation = currentState[boxLocation + 1];
          if (
            boxesNewLocation !== obstacle &&
            leftBoundary.current.includes(boxLocation + 1) === false
          ) {
            currentState[boxLocation + 1] = box;
            currentState[boxLocation] = emptySpace;
          }
          if (currentState[playerLocation + 1] !== box) {
            currentState[playerLocation + 1] = player;
            currentState[playerLocation] =
              currentState[playerLocation] === box ? box : emptySpace;
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
          {currentArrangement.map((blocks: string, index: number) => {
            return (
              <div className="box">
                <img data-id={index} alt={blocks} key={index} src={blocks} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
