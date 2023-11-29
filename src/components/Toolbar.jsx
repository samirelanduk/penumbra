import { useFormattingShortcuts } from "@/hooks";
import { Transforms, Editor } from "slate";
import BoldIcon from "@/images/bold.svg";
import ItalicsIcon from "@/images/italics.svg";
import UnderlineIcon from "@/images/underline.svg";
import StrikethroughIcon from "@/images/strikethrough.svg";
import ParagraphIcon from "@/images/paragraph.svg";
import H1Icon from "@/images/h1.svg";
import H2Icon from "@/images/h2.svg";
import H3Icon from "@/images/h3.svg";
import BulletIcon from "@/images/bullet.svg";
import { useSlate } from "slate-react";
import { useContext } from "react";
import { PreviewContext } from "@/contexts";

const Toolbar = () => {

  const editor = useSlate();
  const preview = useContext(PreviewContext);

  const shortcuts = {
    "1": () => toggleBlock(editor, "h1"),
    "2": () => toggleBlock(editor, "h2"),
    "3": () => toggleBlock(editor, "h3"),
    "b": () => toggleMark(editor, "bold"),
    "i": () => toggleMark(editor, "italics"),
    "u": () => toggleMark(editor, "underline"),
    "z": () => editor.undo(),
    "+z": () => editor.redo(),
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

  const buttonClass = `w-6 h-6 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-900 ${preview ? "" : "sm:h-8 sm:w-8"}`
  const selectedButtonClass = `${buttonClass} bg-gray-200 dark:bg-slate-900`
  const iconClass = "w-full h-auto fill-gray-600 dark:fill-gray-400";

  const blocks = [
    {
      checker: isBlockActive,
      toggle: toggleBlock,
      buttons: [
        {type: "p", icon: <ParagraphIcon className={iconClass} />, className: `p-1 ${preview ? "" : "sm:p-2"}`},
        {type: "ul", icon: <BulletIcon className={iconClass} />, className: `p-1 ${preview ? "" : "sm:p-1.5"}`},
        {type: "h1", icon: <H1Icon className={iconClass} />, className: preview ? "" : "sm:p-0.5"},
        {type: "h2", icon: <H2Icon className={iconClass} />, className: `p-0.5 ${preview ? "" : "sm:p-1"}`},
        {type: "h3", icon: <H3Icon className={iconClass} />, className: `p-1 ${preview ? "" : "sm:p-1.5"}`},
      ],
    },
    {
      checker: isMarkActive,
      toggle: toggleMark,
      buttons: [
        {type: "bold", icon: <BoldIcon className={iconClass} />, className: `p-1 ${preview ? "" : "sm:p-2"}`},
        {type: "italics", icon: <ItalicsIcon className={iconClass} />, className: `p-1 ${preview ? "" : "sm:p-2"}`},
        {type: "underline", icon: <UnderlineIcon className={iconClass} />, className: `p-1 ${preview ? "" : "sm:p-2"}`},
        {type: "strikethrough", icon: <StrikethroughIcon className={iconClass} />, className: `p-0.5 ${preview ? "" : "sm:p-1.5"}`},
      ],
    }
  ];

  return (
    <div className={`flex gap-3 w-fit ${preview ? "scale-75 -ml-8 sm:scale-100 sm:ml-0" : "sm:gap-5"}`}>
      {blocks.map((block, index) => {
        return (
          <div className={`flex gap-1 ${preview ? "" : "sm:gap-2"}`} key={index}>
            {block.buttons.map(button => {
              const className = block.checker(editor, button.type) ? selectedButtonClass : buttonClass;
              return (
                <div
                  className={`${className} ${button.className}`}
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