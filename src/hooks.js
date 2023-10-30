import { useEffect } from "react";
import { plainText } from "./serialize";

export const useWarnUnsavedChanges = document => {
  /**
   * This hook adds an event listener to the window object that warns the user
   * if they attempt to close the window or navigate away from the page without
   * saving their changes.
   */
  
  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      if (!document) return;
      const text = plainText(document.slate);
      if (document.name) {
        if (text.length === document.initialCharacterCount) return;
      } else {
        if (!text) return;
      }
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [document]);
}

export default useWarnUnsavedChanges;
