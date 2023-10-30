import { countWords, makeDocument } from "../utils";

describe("countWords", () => {

  it("Handles empty string", async () => {
    const text = "";
    expect(countWords(text)).toEqual(0);
  })

  it("Gets one word", async () => {
    const text = "Hello";
    expect(countWords(text)).toEqual(1);
  })

  it("Gets multiple words", async () => {
    const text = "Hello world";
    expect(countWords(text)).toEqual(2);
  })

  it("Ignores punctuation", async () => {
    const text = "Hello world!";
    expect(countWords(text)).toEqual(2);
  })

  it("Ignores whitespace", async () => {
    const text = "Hello   world\nLine2 line2.";
    expect(countWords(text)).toEqual(4);
  })

})



describe("makeDocument", () => {

  it("Returns a document object with all fields", async () => {
    expect(makeDocument()).toEqual({
      slate: [{type: "p", children: [{ text: ""}]}],
      name: null,
      initialCharacterCount: 0,
      initialWordCount: 0,
      password: null,
      fileHandle: null
    })
  })

})