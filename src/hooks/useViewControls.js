import { useEffect } from "react";

export const useKeydownListener = (keyEventMapping) => {
  useEffect(() => {
    function handleKeyPress(e) {
      for (const key in keyEventMapping) {
        if (e.key === key || e.keyCode === keyEventMapping[key]) {
          if (keyEventMapping[key].enabled) {
            keyEventMapping[key].cb();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [keyEventMapping]);
};