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
    name: null,
    initialCharacterCount: 0,
    initialWordCount: 0,
    password: null,
    fileHandle: null,
    settings: {
      font: null,
      textSize: null,
      showWordCount: null,
      showCharacterCount: null,
    },
  }
}