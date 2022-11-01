import ICell from "../interfaces/ICell";

const emptySpace = require("../images/blank.png");
const goal = require("../images/goal.png");

const useGoalReset = (
  currentArrangement: Array<ICell>,
  goalLocations: Array<ICell>
) => {
  goalLocations.forEach(
    (cell: ICell) =>
      (currentArrangement[cell.index].content =
        currentArrangement[cell.index].content === emptySpace
          ? goal
          : currentArrangement[cell.index].content)
  );
};
export default useGoalReset;
