export const countWords = text => {
  /**
   * Returns the number of words in a string.
   */

  const words = text.match(/\b\w+\b/g);
  return  words ? words.length : 0;
}