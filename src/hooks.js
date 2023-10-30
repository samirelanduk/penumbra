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


export const useDocumentTitle = document => {
  /**
   * This hook updates the document title to reflect the name of the document
   * being edited.
   */

  useEffect(() => {
    if (!document || !document.name) {
      window.document.title = "Penumbra - encrypted local notes";
    } else {
      window.document.title = `${document.name} - Penumbra`;
    }
  }, [document]);
}


export const useFormattingShortcuts = (editor, shortcuts) => {
  /**
   * This hook adds event listeners to the window object that allow the user to
   * apply formatting to the current selection using keyboard shortcuts.
   */

  useEffect(() => {
    const handleKeyDown = (event) => {
      const processedShortcuts = Object.entries(shortcuts).reduce((acc, [key, value]) => {
        acc[key.replace("+", "")] = {func: value, shift: key.includes("+")};
        return acc;
      }, {});
      if (event.metaKey || event.ctrlKey) {
        if (processedShortcuts[event.key] && (
          !processedShortcuts[event.key].shift || event.shiftKey
        )) {
          event.preventDefault();
          processedShortcuts[event.key].func();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [editor, shortcuts]);
}