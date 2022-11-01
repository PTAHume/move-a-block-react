import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

import Cell from "./shared/Cell";
import ICell from "./interfaces/ICell";

import useKeyPress from "./hooks/handle-key-press-events";
import useHandleUpAction from "./hooks/handle-up-press-action";
import useHandleDownAction from "./hooks/handle-down-press-action";
import useHandleLeftAction from "./hooks/handle-left-press-action";
import useHandleRightAction from "./hooks/handle-right-press-action";
import useResetGoals from "./hooks/handle-goals-reset";
import useLevelCompleteCheck from "./hooks/handle-level-complete-check";
import useLevelLoader from "./hooks/level-loader";


function App() {
  const keyUp = "ArrowUp";
  const keyDown = "ArrowDown";
  const keyLeft = "ArrowLeft";
  const keyRight = "ArrowRight";

  const moveUp: boolean = useKeyPress(keyUp);
  const moveDown: boolean = useKeyPress(keyDown);
  const moveLeft: boolean = useKeyPress(keyLeft);
  const moveRight: boolean = useKeyPress(keyRight);

  const emptySpace = require("./images/blank.png");
  const player = require("./images/player.png");
  const box = require("./images/box.png");
  const goal = require("./images/goal.png");
  const invalid = require("./images/invalid.png");

  const handleUpAction = useHandleUpAction;
  const handleDownAction = useHandleDownAction;
  const handleLeftAction = useHandleLeftAction;
  const handleRightAction = useHandleRightAction;
  const resetGoals = useResetGoals;
  const levelCompleteCheck = useLevelCompleteCheck;
  const { LoadLevel } = useLevelLoader();

  const [currentArrangement, setCurrentArrangement]: any[] = useState([
    Array<Cell>(100),
  ]);

  const [goalLocations, setGoalLocations]: any[] = useState([Array<Cell>(100)]);
  const width: number = 10;
  const level = useRef<number>(0);
  const keyPress = useRef<boolean>(false);
  const levelInfo: ICell[] = LoadLevel(level.current)

  useEffect(() => {
    let buildLevel: Array<Cell> = [...Array(100)].map(
      (value: any, index: number) => new Cell({ content: emptySpace, index: index })
    );

    levelInfo.forEach((result: ICell) => {
      console.log(result)
      buildLevel[result.index] = {
        content: result.content,
        index: result.index
      }
    });

    let buildGoalLocations = buildLevel.filter(
      (cell: ICell) => {
        if (goal && cell?.content) {
          const matchGoal = goal.match(/[^\\/]+?(?=\.{1}\w){1}\b/i);
          const matchCell = cell.content.match(/[^\\/]+?(?=\.{1}\w){1}\b/i);
          if (matchGoal && matchCell && matchGoal.length && matchCell.length) {
            return matchGoal[0] === matchCell[0];
          }
          return false
        }
        return false
      }
    );

    setGoalLocations(buildGoalLocations);

    setCurrentArrangement(buildLevel);

  }, [levelInfo])

  const checkKeyEvent = useCallback((key: string) => {
    const boxLocations: ICell[] = currentArrangement.filter(
      (cell: ICell) => cell.content === box
    );
    const playerLocation: number = currentArrangement.findIndex(
      (value: ICell) => value.content === player
    );
    if (keyUp === key) {
      handleUpAction(playerLocation, boxLocations, currentArrangement, width);
    } else if (keyDown === key) {
      handleDownAction(
        playerLocation,
        boxLocations,
        currentArrangement,
        width
      );
    } else if (keyLeft === key) {
      handleLeftAction(playerLocation, boxLocations, currentArrangement);
    } else if (keyRight === key) {
      handleRightAction(playerLocation, boxLocations, currentArrangement);
    }
  }, [])


  useEffect(() => {
    console.log(moveUp, moveDown, moveLeft, moveRight);

    let direction = Boolean(moveUp || moveDown || moveLeft || moveRight);
    if (keyPress.current === false && direction === true) {
      let key = moveUp
        ? keyUp
        : moveDown
          ? keyDown
          : moveLeft
            ? keyLeft
            : moveRight
              ? keyRight
              : "";

      checkKeyEvent(key);

      resetGoals(currentArrangement, goalLocations);

      levelCompleteCheck(
        currentArrangement,
        goalLocations,
        level.current
      );

      setCurrentArrangement([...currentArrangement]);
    } else if (keyPress.current === true && direction === false) {
      keyPress.current = false;
      let foo = currentArrangement
        .filter((cell: ICell) => cell.content === invalid)
        .forEach((cell: ICell) => {
          currentArrangement[cell.index].content = player;
        });
      setCurrentArrangement(foo);
    }
  }, [
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
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


