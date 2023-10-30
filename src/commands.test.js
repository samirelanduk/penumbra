import { createEditor } from "slate";
import { withPenumbraCommands } from "./commands";

describe("withPenumbraCommands", () => {

  it("Adds new paragraph", async () => {
    const editor = withPenumbraCommands(createEditor());
    editor.children = [{type: "h1", children: [{ text: ""}]}];
    editor.insertBreak();
    expect(editor.children).toEqual([
      {type: "h1", children: [{ text: ""}]},
      {type: "p", children: [{ text: ""}]}
    ]);
  })

  it("Splits existing paragraph", async () => {
    const editor = withPenumbraCommands(createEditor());
    editor.children = [{type: "h1", children: [{ text: "Hello world"}]}];
    editor.selection = {anchor: {path: [0, 0], offset: 5}, focus: {path: [0, 0], offset: 5}};
    editor.insertBreak();
    expect(editor.children).toEqual([
      {type: "h1", children: [{ text: "Hello"}]},
      {type: "p", children: [{ text: ""}]},
      {type: "h1", children: [{ text: " world"}]}
    ]);
  })

  it("Removes selection", async () => {
    const editor = withPenumbraCommands(createEditor());
    editor.children = [{type: "h1", children: [{ text: "Hello world"}]}];
    editor.selection = {anchor: {path: [0, 0], offset: 5}, focus: {path: [0, 0], offset: 10}};
    editor.insertBreak();
    expect(editor.children).toEqual([
      {type: "h1", children: [{ text: "Hello"}]},
      {type: "p", children: [{ text: ""}]},
      {type: "h1", children: [{ text: "d"}]}
    ]);
  })

})