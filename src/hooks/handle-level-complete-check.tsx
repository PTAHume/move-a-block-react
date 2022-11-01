import ICell from "../interfaces/ICell";

const box = require("../images/box.png");

const useLevelCompleteCheck = (
  currentArrangement: Array<ICell>,
  goalLocations: Array<ICell>,
  level: number,
) => {
  if (
    currentArrangement
      .filter((cell: ICell) => cell.content === box)
      .every((cell: ICell) => {
        return !(
          goalLocations.findIndex(
            (value: ICell) => value.index === cell.index
          ) === -1
        );
      })
  ) {
    setTimeout(() => {
      alert("you win !");
      level = level + 1;
    }, 10);
  }
};

export default useLevelCompleteCheck;
