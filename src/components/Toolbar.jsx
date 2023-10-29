import React from "react";
import { Transforms, Editor } from "slate";
import { useSlate } from "slate-react";

const Toolbar = () => {

  const editor = useSlate();

  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && Editor.isBlock(editor, n) && n.type === format,
    });
    return !!match;
  };

  const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const newProperties = {type: isActive ? "p" : format};
    Transforms.setNodes(editor, newProperties);
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

  const buttonClass = "w-10 h-10 flex items-center justify-center rounded-md cursor-pointer text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-900"
  const selectedButtonClass = `${buttonClass} bg-gray-100 dark:bg-slate-900`

  return (
    <div className="flex mx-auto">
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
        className={`${buttonClass} font-bold ml-5`}
      >
        B
      </div>
      <div
        className={`${buttonClass} italic`}
      >
        I
      </div>
      <div
        className={`${buttonClass} underline`}
      >
        U
      </div>
      <div
        className={`${buttonClass} line-through`}
      >
        S
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  
};

export default Toolbar;