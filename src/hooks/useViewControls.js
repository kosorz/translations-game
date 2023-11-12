import { useEffect } from "react";

export const useKeydownListener = ({ keyEventMapping, disabled }) => {
  useEffect(() => {
    function handleKeyPress(e) {
      for (const key in keyEventMapping) {
        if (e.key === key || e.keyCode === keyEventMapping[key]) {
          keyEventMapping[key].forEach((k) => {
            if (!disabled && k.active) k.cb();
          });
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [keyEventMapping]);
};
