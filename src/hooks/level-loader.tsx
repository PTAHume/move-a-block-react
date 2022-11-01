import { useCallback, useEffect, useRef, useState } from "react";
import ICell from "../interfaces/ICell";

const useLevelLoader = () => {
  const [levelDetails, setLevelDetails] = useState<ICell[]>(Array<ICell>);
  const LoadLevel = (level: number): ICell[] => {
    useEffect(() => {
      const apiRoot = "https://localhost:7274/Game";
      const fetchLevel = async () => {
        const resp = await fetch(`${apiRoot}/GetLevel/${level}`);
        const levelInfo: ICell[] = await resp.json();
        setLevelDetails(levelInfo);
      };
      fetchLevel();
    }, [level]);
    return levelDetails
  }
  return { LoadLevel };
}
export default useLevelLoader

