import { plainText } from "../serialize";

describe("plainText", () => {

  it("Returns empty string for null", async () => {
    expect(plainText(undefined)).toEqual("");
  })

  it("Returns empty string for empty document", async () => {
    const nodes = [];
    expect(plainText(nodes)).toEqual("");
  })

  it("Returns plain text for a single paragraph", async () => {
    const nodes = [{type: "p", children: [{ text: "Hello world"}]}];
    expect(plainText(nodes)).toEqual("Hello world");
  })

  it("Returns plain text for multiple paragraphs", async () => {
    const nodes = [
      {type: "p", children: [{ text: "Hello world"}]},
      {type: "p", children: [{ text: "Line2 line2."}]}
    ];
    expect(plainText(nodes)).toEqual("Hello world\nLine2 line2.");
  })

  it("Handles multiple inline elements", async () => {
    const nodes = [
      {type: "p", children: [{ text: "Hello world "}, { text: "Line2 line2."}]},
      {type: "p", children: [{ text: "Line2 line2."}]}
    ];
    expect(plainText(nodes)).toEqual("Hello world Line2 line2.\nLine2 line2.");
  })

})