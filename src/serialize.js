import { Node } from "slate";

export const plainText = nodes => {
  /**
   * Takes a Slate document and returns a plain text string.
   * 
   * @param {Array} nodes
   * @returns {string}
   */
  
  if (!nodes) return "";
  return nodes.map(n => Node.string(n)).join("\n");
}