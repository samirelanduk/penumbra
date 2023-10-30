import { useFormattingShortcuts } from "@/hooks";
import React, { useEffect } from "react";
import { Transforms, Editor } from "slate";
import { useSlate } from "slate-react";

const Toolbar = () => {

  const editor = useSlate();

  const shortcuts = {
    "1": () => toggleBlock(editor, "h1"),
    "2": () => toggleBlock(editor, "h2"),
    "3": () => toggleBlock(editor, "h3"),
    "b": () => toggleMark(editor, "bold"),
    "i": () => toggleMark(editor, "italics"),
    "u": () => toggleMark(editor, "underline"),
    "z": () => editor.undo(),
    "r": () => editor.redo(),
  }

  useFormattingShortcuts(editor, shortcuts);

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

  const buttonClass = "w-6 h-6 text-sm flex items-center justify-center rounded-md cursor-pointer text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-900 sm:h-8 sm:w-8 sm:text-base"
  const selectedButtonClass = `${buttonClass} bg-gray-100 dark:bg-slate-900`

  const blocks = [
    {
      checker: isBlockActive,
      toggle: toggleBlock,
      buttons: [
        {type: "p", icon: "P"},
        {type: "h1", icon: "H1"},
        {type: "h2", icon: "H2"},
        {type: "h3", icon: "H3"}
      ],
    },
    {
      checker: isMarkActive,
      toggle: toggleMark,
      buttons: [
        {type: "bold", icon: "B"},
        {type: "italics", icon: "I"},
        {type: "underline", icon: "U"},
        {type: "strikethrough", icon: "S"}
      ],
    }
  ];

  return (
    <div className="flex gap-3 w-fit sm:gap-5">
      {blocks.map((block, index) => {
        return (
          <div className="flex gap-1 sm:gap-2" key={index}>
            {block.buttons.map(button => {
              const className = block.checker(editor, button.type) ? selectedButtonClass : buttonClass;
              return (
                <div
                  className={className}
                  onMouseDown={e => {
                    e.preventDefault();
                    block.toggle(editor, button.type);
                  }}
                  key={button.type}
                >
                  {button.icon}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

Toolbar.propTypes = {
  
};

export default Toolbar;