export const countWords = text => {
  /**
   * Returns the number of words in a string.
   */

  const words = text.match(/\b\w+\b/g);
  return  words ? words.length : 0;
}


export const makeDocument = () => {
  /**
   * Returns a new document object with all fields.
   */
  
  return {
    text: "",
    name: null,
    initialCharacterCount: 0,
    initialWordCount: 0,
    password: null,
    fileHandle: null
  }
}


export const innerHtmlToMarkdown = html => {
  /**
   * Converts the innerHTML of a contenteditable div to markdown.
   * 
   * @param {string} html - The innerHTML of a contenteditable div.
   * @returns {string} markdown - The markdown version of the html.
   */

  let markdown = html;

  // Replace all &nbsp; with spaces.
  markdown = html.replace(/&nbsp;/g, " ");

  // Replace <div>...</div> blocks with contents of those divs plus a line break
  markdown = markdown.replace(/<div>(.*?)<\/div>/g, "$1\n");

  // Replace all <br> with newlines.
  markdown = markdown.replace(/<br>/g, "\n");

  // Replace html entities with the actual symbol.
  markdown = markdown.replace(/&lt;/g, "<");
  markdown = markdown.replace(/&gt;/g, ">");
  markdown = markdown.replace(/&amp;/g, "&");
  markdown = markdown.replace(/&quot;/g, '"');
  markdown = markdown.replace(/&apos;/g, "'");
  
  // Replace asterisks and underscore with escaped versions.
  markdown = markdown.replace(/\*/g, "\\*");
  markdown = markdown.replace(/_/g, "\\_");

  // Replace <b>...</b> with **...**
  markdown = markdown.replace(/<b>(.*?)<\/b>/g, "**$1**");

  return markdown;
}