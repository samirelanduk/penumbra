import { Transforms, Editor, Path } from "slate";

export const isMarkActive = (editor, mark) => {
  /**
   * Checks if any of the text nodes in the current selection have the specified
   * mark.
   */

  const marks = Editor.marks(editor);
  return marks ? marks[mark] === true : false;
}


export const isBlockActive = (editor, type) => {
  /**
   * Checks if the current selection contains a block node of the specified
   * type. The block node must be at the root of the editor.
   */

  const [match] = Editor.nodes(editor, {
    match: (n, path) => n.type === type && path.length === 1
  });
  return !!match;
}


export const getBaseElements = editor => {
  /**
   * Returns an array of the base nodes in the current selection - those that
   * contain text nodes. The array is sorted in reverse order of the nodes'
   * paths (i.e. bottom-up as they appear on screen).
   */

  const baseNodesInSelection = Array.from(Editor.nodes(editor, {
    match: n => n.children && n.children.some(c => "text" in c)
  }));
  baseNodesInSelection.sort((a, b) => Path.compare(b[1], a[1]));
  return baseNodesInSelection;
}


export const toggleMark = (editor, mark) => {
  /**
   * Toggles the specified mark on the current selection. If the mark is already
   * present on any of the text nodes in the selection, it is removed wherever
   * it is found. If the mark is not present, it is added to all text nodes in
   * the selection.
   * 
   * Slate handles the splitting and merging of text nodes automatically, so
   * there is no need to worry about the mark being applied to only part of a
   * text node.
   */

  if (isMarkActive(editor, mark)) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
}


export const toggleSimpleBlock = (editor, type) => {
  /**
   * Toggles the type of simple elements (i.e those which are immediate
   * children of the editor and contain text nodes). If the current selection
   * contains any elements of the specified type, they are converted to type
   * "p" and everything else is left as is. If the current selection does not
   * contain any elements of the specified type, all base elements in the
   * selection are converted to the specified type and lifted to the root of
   * the editor. Slate handles the splitting and merging of nodes
   * automatically.
   * 
   * If the specified type is "p", the function will always convert all base
   * elements in the selection to type "p" and lift them to the root of the
   * editor. In other words it will act as though isBlockActive is false.
   */

  const currentlyActive = isBlockActive(editor, type);
  const baseNodesInSelection = getBaseElements(editor);
  for (const [node, path] of baseNodesInSelection) {
    if (type !== "p" && currentlyActive && (node.type === type)) {
      Transforms.setNodes(editor, {type: "p"}, {at: path});
    } else if (!currentlyActive || type === "p") {
      Transforms.setNodes(editor, {type: type}, {at: path});
      if (path.length > 1) Transforms.liftNodes(editor, {at: path});
    }
  }
}


export const toggleComplexBlock = (editor, type, subtype) => {
  /**
   * Toggles the type of complex elements (i.e those which contain other
   * elements). If the current selection contains any elements of the specified
   * type, they are converted to type "p", raised up, and everything else is
   * left as is. If the current selection does not contain any elements of the
   * specified type, all base elements in the selection are converted to the
   * specified subtype and placed in a new element of the specified type. Slate
   * handles the splitting and merging of nodes automatically.
   */

  const currentlyActive = isBlockActive(editor, type);
  const baseNodesInSelection = getBaseElements(editor);
  for (const [,path] of baseNodesInSelection) {
    if (currentlyActive) {
      if (path.length > 1 && editor.children[path[0]].type === type) {
        Transforms.setNodes(editor, {type: "p"}, {at: path});
        Transforms.liftNodes(editor, {at: path});
      }
    } else {
      Transforms.setNodes(editor, {type: subtype}, {at: path});
      if (path.length > 1) Transforms.liftNodes(editor, {at: path});
    }
  }
  if (!currentlyActive) {
    Transforms.wrapNodes(editor, {type: type}, {at: editor.selection});
  }
}