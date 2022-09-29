import { useEffect, useState } from "react";
import useKeyPress from "./hooks/key-press-handler";
import "./App.css";

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
  useEffect(() => {
    let buildLevel: Array<string> = new Array<string>(64);
    buildLevel.fill(emptySpace, 0, 63);
    buildLevel[7] = player;
    buildLevel[31] = obstacle;
    buildLevel[27] = goal;
    buildLevel[17] = box;
    setCurrentArrangement(buildLevel);
  }, [player, obstacle, goal, emptySpace, box]);
  useEffect(() => {
    if (moveUp || moveDown || moveLeft || moveRight) {
      const currentState = currentArrangement;
      const boxLocation = currentState.indexOf(box);
      const playerLocation = currentState.indexOf(player);

      if (
        moveUp &&
        currentState[playerLocation - width] !== obstacle &&
        currentState[playerLocation - width] !== undefined &&
        currentState[boxLocation - width] !== undefined
      ) {
        if (currentState[boxLocation - width] !== obstacle) {
          currentState[boxLocation - width] = box;
          currentState[boxLocation] = emptySpace;
        }
        currentState[playerLocation - width] = player;
        currentState[playerLocation] = emptySpace;
      }

      if (
        moveDown &&
        currentState[playerLocation + width] !== obstacle &&
        currentState[playerLocation + width] !== undefined &&
        currentState[boxLocation + width] !== undefined
      ) {
        if (currentState[boxLocation + width] !== obstacle) {
          currentState[boxLocation + width] = box;
          currentState[boxLocation] = emptySpace;
        }
        currentState[playerLocation + width] = player;
        currentState[playerLocation] = emptySpace;
      }

      if (
        moveLeft &&
        currentState[playerLocation - 1] !== obstacle &&
        currentState[playerLocation - 1] !== undefined &&
        currentState[boxLocation - 1] !== undefined
      ) {
        if (currentState[boxLocation - 1] !== obstacle) {
          currentState[boxLocation - 1] = box;
          currentState[boxLocation] = emptySpace;
        }
        currentState[playerLocation - 1] = player;
        currentState[playerLocation] = emptySpace;
      }

      if (
        moveRight &&
        currentState[playerLocation + 1] !== obstacle &&
        currentState[playerLocation + 1] !== undefined &&
        currentState[boxLocation + 1] !== undefined
      ) {
        if (currentState[boxLocation + 1] !== obstacle) {
          currentState[boxLocation + 1] = box;
          currentState[boxLocation] = emptySpace;
        }

        currentState[playerLocation + 1] = player;
        currentState[playerLocation] = emptySpace;
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
  ]);

  return (
    <>
      <div className="app">
        <div className="game">
          {currentArrangement.map((blocks: string, index: number) => {
            return (
             
                <img data-id={index} alt={blocks} key={index} src={blocks} />
             
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
