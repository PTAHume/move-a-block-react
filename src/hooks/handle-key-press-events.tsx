import { useCallback, useEffect, useRef, useState } from "react";

const useKeyPress = (targetKey: string): boolean => {
  const usKeyDown = useRef(false);
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  const downHandler = useCallback(
    (event: any) => {
      const { key, keyCode } = event;
      if (key === targetKey && !usKeyDown.current) {
        setKeyPressed(true);
        usKeyDown.current = true;
        console.log(keyCode, keyPressed, usKeyDown.current);
      }
    },
    [keyPressed, targetKey]
  );

  // If released key is our target key then set to false
  const upHandler = useCallback(
    (event: any) => {
      const { key, keyCode } = event;
      if (key === targetKey && usKeyDown.current) {
        setKeyPressed(false);
        usKeyDown.current = false;
        console.log(keyCode, keyPressed, usKeyDown.current);
      }
    },
    [keyPressed, targetKey]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
};
export default useKeyPress;
