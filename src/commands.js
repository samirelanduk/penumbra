import { Editor, Range , Transforms} from "slate";
import { isBlockActive, toggleComplexBlock } from "./toolbar";

export const withPenumbraCommands = editor => {

  // The default return key behaviour is mostly fine, but we want to override it
  // specifically when the cursor is at the end of a heading to make the new
  // block a paragraph instead of another heading.
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    const types = ["h1", "h2", "h3"];
    if (types.some(type => isBlockActive(editor, type))) {
      if (editor.selection && Range.isCollapsed(editor.selection)) {
        const [node] = Editor.node(editor, editor.selection.focus.path);
        if ("text" in node) {
          if (editor.selection.focus.offset === node.text.length) {
            const block = {type: "p", children: [{text: ""}]};
            Transforms.insertNodes(editor, block);
            return;
          }
        }
      }
    }
    return insertBreak();
  };
  
  return editor;
};


export const withPenumbraShortcuts = editor => {
  const { insertText } = editor;
  editor.insertText = text => {
    insertText(text);
    if (text === " " && isBlockActive(editor, "p")) {
      if (editor.selection && Range.isCollapsed(editor.selection)) {
        const [[pElement, path]] = Editor.nodes(editor, {
          match: (n,path) => path.length === 1
        });
        if (pElement.children.length === 1 && pElement.children[0].text === "- ") {
          Transforms.delete(editor, {
            at: {
              anchor: { path: [...path, 0], offset: 0 },
              focus: { path: [...path, 0], offset: pElement.children[0].text.length }
            }
          });
          toggleComplexBlock(editor, "ul", "li");
        }   
      }
    }
  };
  return editor;
}