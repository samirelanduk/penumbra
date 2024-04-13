import { useFormattingShortcuts } from "@/hooks";
import { isMarkActive, isBlockActive, toggleMark, toggleSimpleBlock, toggleComplexBlock } from "@/toolbar";
import BoldIcon from "@/images/bold.svg";
import ItalicsIcon from "@/images/italics.svg";
import UnderlineIcon from "@/images/underline.svg";
import StrikethroughIcon from "@/images/strikethrough.svg";
import ParagraphIcon from "@/images/paragraph.svg";
import H1Icon from "@/images/h1.svg";
import H2Icon from "@/images/h2.svg";
import H3Icon from "@/images/h3.svg";
import BulletIcon from "@/images/bullet.svg";
import NumberIcon from "@/images/numbers.svg";
import QuoteIcon from "@/images/quote.svg";
import CodeIcon from "@/images/code.svg";
import { useSlate } from "slate-react";
import { useContext } from "react";
import { PreviewContext } from "@/contexts";
import ToolbarButton from "./ToolbarButton";

const Toolbar = () => {

  const editor = useSlate();
  const preview = useContext(PreviewContext);
  
  const shortcuts = {
    "1": () => toggleSimpleBlock(editor, "h1"),
    "2": () => toggleSimpleBlock(editor, "h2"),
    "3": () => toggleSimpleBlock(editor, "h3"),
    "`": () => toggleComplexBlock(editor, "code", "codeline"),
    "b": () => toggleMark(editor, "bold"),
    "i": () => toggleMark(editor, "italics"),
    "u": () => toggleMark(editor, "underline"),
    "z": () => editor.undo(),
    "+z": () => editor.redo(),
  }

  useFormattingShortcuts(editor, shortcuts);

  const sections = [
    [
      {isActive: () => isBlockActive(editor, "p"), toggle: () => toggleSimpleBlock(editor, "p"), Icon: ParagraphIcon, className: `p-1.5 ${preview ? "" : "sm:p-2"}`},
      {isActive: () => isBlockActive(editor, "h1"), toggle: () => toggleSimpleBlock(editor, "h1"), Icon: H1Icon, className: preview ? "" : "sm:p-0.5"},
      {isActive: () => isBlockActive(editor, "h2"), toggle: () => toggleSimpleBlock(editor, "h2"), Icon: H2Icon, className: `p-0.5 ${preview ? "" : "sm:p-1"}`},
      {isActive: () => isBlockActive(editor, "h3"), toggle: () => toggleSimpleBlock(editor, "h3"), Icon: H3Icon, className: `p-1 ${preview ? "" : "sm:p-1.5"}`},
      {isActive: () => isBlockActive(editor, "code"), toggle: () => toggleComplexBlock(editor, "code", "codeline"), Icon: CodeIcon, className: `p-1 ${preview ? "" : "sm:p-1.5"}`},
      {isActive: () => isBlockActive(editor, "ul"), toggle: () => toggleComplexBlock(editor, "ul", "li"), Icon: BulletIcon, className: `p-1 ${preview ? "" : "sm:p-1.5"}`},
      {isActive: () => isBlockActive(editor, "ol"), toggle: () => toggleComplexBlock(editor, "ol", "li"), Icon: NumberIcon, className: `p-1.5 ${preview ? "" : "sm:p-2"}`},
      {isActive: () => isBlockActive(editor, "blockquote"), toggle: () => toggleComplexBlock(editor, "blockquote", "p"), Icon: QuoteIcon, className: `p-1.5 ${preview ? "" : "sm:p-2"}`},
    ],
    [
      {isActive: () => isMarkActive(editor, "bold"), toggle: () => toggleMark(editor, "bold"), Icon: BoldIcon, className: `p-1.5 ${preview ? "" : "sm:p-2"}`},
      {isActive: () => isMarkActive(editor, "italics"), toggle: () => toggleMark(editor, "italics"), Icon: ItalicsIcon, className: `p-1.5 ${preview ? "" : "sm:p-2"}`},
      {isActive: () => isMarkActive(editor, "underline"), toggle: () => toggleMark(editor, "underline"), Icon: UnderlineIcon, className: `p-1.5 ${preview ? "" : "sm:p-2"}`},
      {isActive: () => isMarkActive(editor, "strikethrough"), toggle: () => toggleMark(editor, "strikethrough"), Icon: StrikethroughIcon, className: `p-1 ${preview ? "" : "sm:p-1.5"}`},
    ]
  ]

  return (
    <div>
      <div className={`flex flex-col gap-x-3 gap-y-1.5 w-fit sm:flex-row ${preview ? "scale-75 -ml-8 sm:flex-col sm:scale-100 sm:ml-0" : "sm:gap-5"}`}>
        {sections.map((section, index) => {
          return (
            <div className={`flex gap-1 ${preview ? "" : "sm:gap-2"}`} key={index}>
              {section.map((button, index) => {
                return (
                  <ToolbarButton
                    key={index}
                    isActive={button.isActive}
                    toggle={button.toggle}
                    Icon={button.Icon}
                    className={button.className}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  
};

export default Toolbar;