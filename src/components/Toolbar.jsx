import React, { useEffect } from "react";
import { Transforms, Editor } from "slate";
import { useSlate } from "slate-react";

const Toolbar = () => {

  const editor = useSlate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey) {
        switch (event.key) {
          case "1":
            event.preventDefault();
            toggleBlock(editor, "h1");
            break;
          case "2":
            event.preventDefault();
            toggleBlock(editor, "h2");
            break;
          case "3":
            event.preventDefault();
            toggleBlock(editor, "h3");
            break;
          case "b":
            event.preventDefault();
            toggleMark(editor, "bold");
            break;
          case "i":
            event.preventDefault();
            toggleMark(editor, "italics");
            break;
          case "u":
            event.preventDefault();
            toggleMark(editor, "underline");
            break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [editor]);

  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && Editor.isBlock(editor, n) && n.type === format,
    });
    return !!match;
  };

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const newProperties = {type: isActive ? "p" : format};
    Transforms.setNodes(editor, newProperties);
  };

  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const pPressed = e => {
    e.preventDefault();
    toggleBlock(editor, "p");
  }

  const h1Pressed = e => {
    e.preventDefault();
    toggleBlock(editor, "h1");
  }

  const h2Pressed = e => {
    e.preventDefault();
    toggleBlock(editor, "h2");
  }

  const h3Pressed = e => {
    e.preventDefault();
    toggleBlock(editor, "h3");
  }

  const boldPressed = e => {
    e.preventDefault();
    toggleMark(editor, "bold");
  };

  const italicsPressed = e => {
    e.preventDefault();
    toggleMark(editor, "italics");
  };

  const underlinePressed = e => {
    e.preventDefault();
    toggleMark(editor, "underline");
  };

  const strikethroughPressed = e => {
    e.preventDefault();
    toggleMark(editor, "strikethrough");
  };

  const buttonClass = "w-8 h-8 flex items-center justify-center rounded-md cursor-pointer text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-900 sm:h-10 sm:w-10"
  const selectedButtonClass = `${buttonClass} bg-gray-100 dark:bg-slate-900`

  return (
    <div className="flex w-fit">
      <div
        className={`${isBlockActive(editor, "p") ? selectedButtonClass : buttonClass}`}
        onMouseDown={pPressed}
      >
        P
      </div>
      <div
        className={`${isBlockActive(editor, "h1") ? selectedButtonClass : buttonClass}`}
        onMouseDown={h1Pressed}
      >
        H1
      </div>
      <div
        className={`${isBlockActive(editor, "h2") ? selectedButtonClass : buttonClass}`}
        onMouseDown={h2Pressed}
      >
        H2
      </div>
      <div
        className={`${isBlockActive(editor, "h3") ? selectedButtonClass : buttonClass}`}
        onMouseDown={h3Pressed}
      >
        H3
      </div>
      <div 
        className={`${isMarkActive(editor, "bold") ? selectedButtonClass : buttonClass} font-bold ml-5`}
        onMouseDown={boldPressed}
      >
        B
      </div>
      <div
        className={`${isMarkActive(editor, "italics") ? selectedButtonClass : buttonClass} italic`}
        onMouseDown={italicsPressed}
      >
        I
      </div>
      <div
        className={`${isMarkActive(editor, "underline") ? selectedButtonClass : buttonClass} underline`}
        onMouseDown={underlinePressed}
      >
        U
      </div>
      <div
        className={`${isMarkActive(editor, "strikethrough") ? selectedButtonClass : buttonClass} line-through`}
        onMouseDown={strikethroughPressed}
      >
        S
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  
};

export default Toolbar;