import { Transforms } from "slate";

export const withPenumbraCommands = editor => {
  editor.insertBreak = () => {
    const block = {type: "p", children: [{text: ""}]};
    Transforms.insertNodes(editor, block);
  };
  return editor;
};