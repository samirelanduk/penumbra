import { createEditor } from "slate";
import { isMarkActive, isBlockActive, getBaseElements, toggleMark, toggleSimpleBlock, toggleComplexBlock } from "../toolbar";

describe("isMarkActive", () => {

  const editor = createEditor();
  editor.children = [
    {type: "p", children: [{text: "Paragraph 1", bold: true}]},
    {type: "p", children: [{text: "Paragraph 2", italics: true, bold: true}]},
    {type: "p", children: [{text: "Paragraph 3"}, {text: "Paragraph 3a", bold: true}]},
  ];

  it("can get bold mark", () => {
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
    expect(isMarkActive(editor, "bold")).toBe(true);
  })

  it("can get bold mark when there are other marks", () => {
    editor.selection = {
      anchor: { path: [1, 0], offset: 0 },
      focus: { path: [1, 0], offset: 0 },
    };
    expect(isMarkActive(editor, "bold")).toBe(true);
  })

  it("can detect no bold mark", () => {
    editor.selection = {
      anchor: { path: [2, 0], offset: 0 },
      focus: { path: [2, 0], offset: 0 },
    };
    expect(isMarkActive(editor, "bold")).toBe(false);
  })
  
  it("can detect bold mark from second text element", () => {
    editor.selection = {
      anchor: { path: [2, 1], offset: 1 },
      focus: { path: [2, 1], offset: 1 },
    };
    expect(isMarkActive(editor, "bold")).toBe(true);
  })

  it("can detect bold mark from selection within text node", () => {
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 3 },
    };
    expect(isMarkActive(editor, "bold")).toBe(true);
  })

  it("can detect no mark from selection within text node", () => {
    editor.selection = {
      anchor: { path: [2, 0], offset: 1 },
      focus: { path: [2, 0], offset: 3 },
    };
    expect(isMarkActive(editor, "bold")).toBe(false);
  })

  it("can detect from multi-node selection", () => {
    editor.selection = {
      anchor: { path: [0, 0], offset: 1 },
      focus: { path: [2, 1], offset: 3 },
    };
    expect(isMarkActive(editor, "bold")).toBe(true);
  })

})


describe("isBlockActive", () => {

  const editor = createEditor();
  editor.children = [
    {type: "h1", children: [{text: "Title"}]},
    {type: "p", children: [{text: "Paragraph 2"}]},
    {type: "blockquote", children: [
      {type: "p", children: [{text: "Quote 1"}]},
      {type: "p", children: [{text: "Quote 2"}]},
    ]},
    {type: "ul", children: [
      {type: "li", children: [{text: "Item 1"}]},
      {type: "li", children: [{text: "Item 2"}]},
    ]},
  ];

  it("can detect from h1 element", () => {
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
    expect(isBlockActive(editor, "h1")).toBe(true);
    expect(isBlockActive(editor, "p")).toBe(false);
  })

  it("can detect from p element", () => {
    editor.selection = {
      anchor: { path: [1, 0], offset: 0 },
      focus: { path: [1, 0], offset: 0 },
    };
    expect(isBlockActive(editor, "h1")).toBe(false);
    expect(isBlockActive(editor, "p")).toBe(true);
  })

  it("can detect parent element only", () => {
    editor.selection = {
      anchor: { path: [2, 0, 0], offset: 0 },
      focus: { path: [2, 0, 0], offset: 0 },
    };
    expect(isBlockActive(editor, "h1")).toBe(false);
    expect(isBlockActive(editor, "p")).toBe(false);
    expect(isBlockActive(editor, "blockquote")).toBe(true);
  })

  it("can detect ul", () => {
    editor.selection = {
      anchor: { path: [3, 0, 0], offset: 0 },
      focus: { path: [3, 0, 0], offset: 0 },
    };
    expect(isBlockActive(editor, "h1")).toBe(false);
    expect(isBlockActive(editor, "p")).toBe(false);
    expect(isBlockActive(editor, "ul")).toBe(true);
  })

  it("can search multiple nodes", () => {
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [1, 0], offset: 4 },
    };
    expect(isBlockActive(editor, "h1")).toBe(true);
    expect(isBlockActive(editor, "p")).toBe(true);
    expect(isBlockActive(editor, "blockquote")).toBe(false);
    expect(isBlockActive(editor, "ul")).toBe(false);
  })

  it("can detect parent p and ignore child p", () => {
    editor.selection = {
      anchor: { path: [1, 0], offset: 0 },
      focus: { path: [2, 0, 0], offset: 4 },
    };
    expect(isBlockActive(editor, "h1")).toBe(false);
    expect(isBlockActive(editor, "p")).toBe(true);
    expect(isBlockActive(editor, "blockquote")).toBe(true);
    expect(isBlockActive(editor, "ul")).toBe(false);
  })
})


describe("getBaseElements", () => {
  const editor = createEditor();
  editor.children = [
    {type: "h1", children: [{text: "Title"}]},
    {type: "p", children: [{text: "Paragraph 2"}]},
    {type: "blockquote", children: [
      {type: "p", children: [{text: "Quote 1"}]},
      {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a"}]},
    ]},
    {type: "ul", children: [
      {type: "li", children: [{text: "Item 1"}, {text: "Item 1a"}]},
      {type: "li", children: [{text: "Item 2"}]},
    ]},
  ];

  it("can get first parent element", () => {
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
    expect(getBaseElements(editor)).toEqual([[{type: "h1", children: [{text: "Title"}]}, [0]]]);
  })

  it("can get second parent element", () => {
    editor.selection = {
      anchor: { path: [1, 0], offset: 2 },
      focus: { path: [1, 0], offset: 2 },
    };
    expect(getBaseElements(editor)).toEqual([[{type: "p", children: [{text: "Paragraph 2"}]}, [1]]]);
  })

  it("can get parent element only", () => {
    editor.selection = {
      anchor: { path: [2, 0, 0], offset: 2 },
      focus: { path: [2, 0, 0], offset: 2 },
    };
    expect(getBaseElements(editor)).toEqual([[{type: "p", children: [{text: "Quote 1"}]}, [2, 0]]]);
  })

  it("can get parent from second text node", () => {
    editor.selection = {
      anchor: { path: [2, 1, 1], offset: 2 },
      focus: { path: [2, 1, 1], offset: 2 },
    };
    expect(getBaseElements(editor)).toEqual([[{type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a"}]}, [2, 1]]]);
  })

  it("can get parent from selection within node", () => {
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 5 },
    };
    expect(getBaseElements(editor)).toEqual([[{type: "h1", children: [{text: "Title"}]}, [0]]]);
  })

  it("can get parents from multiple simple nodes", () => {
    editor.selection = {
      anchor: { path: [0, 0], offset: 4 },
      focus: { path: [1, 0], offset: 2 },
    };
    expect(getBaseElements(editor)).toEqual([
      [{type: "p", children: [{text: "Paragraph 2"}]}, [1]],
      [{type: "h1", children: [{text: "Title"}]}, [0]],
    ]);
  })

  it("can get multiple parents from complex and simple nodes", () => {
    editor.selection = {
      anchor: { path: [1, 0], offset: 3 },
      focus: { path: [3, 0, 1], offset: 1 },
    };
    expect(getBaseElements(editor)).toEqual([
      [{type: "li", children: [{text: "Item 1"}, {text: "Item 1a"}]}, [3, 0]],
      [{type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a"}]}, [2, 1]],
      [{type: "p", children: [{text: "Quote 1"}]}, [2, 0]],
      [{type: "p", children: [{text: "Paragraph 2"}]}, [1]],
    ]);
  })
})


describe("toggleMark", () => {

  const editor = createEditor();
  const resetEditor = () => {
    editor.children = [
      {type: "p", children: [{text: "Paragraph 1", bold: true}]},
      {type: "p", children: [{text: "Paragraph 2", italics: true, bold: true}]},
      {type: "p", children: [{text: "Paragraph 3"}, {text: "Paragraph 3a", bold: true}]},
      {type: "p", children: [{text: "Paragraph 4"}]},
    ];
  }

  it("can remove bold from entire text node", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 11 },
    };
    toggleMark(editor, "bold");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Paragraph 1"}]},
      {type: "p", children: [{text: "Paragraph 2", italics: true, bold: true}]},
      {type: "p", children: [{text: "Paragraph 3"}, {text: "Paragraph 3a", bold: true}]},
      {type: "p", children: [{text: "Paragraph 4"}]},
    ]);
  })

  it("can remove bold from inside text node", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 3 },
      focus: { path: [0, 0], offset: 8 },
    };
    toggleMark(editor, "bold");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Par", bold: true}, {text: "agrap"}, {text: "h 1", bold: true}]},
      {type: "p", children: [{text: "Paragraph 2", italics: true, bold: true}]},
      {type: "p", children: [{text: "Paragraph 3"}, {text: "Paragraph 3a", bold: true}]},
      {type: "p", children: [{text: "Paragraph 4"}]},
    ]);
  })

  it("can remove bold mark only", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [1, 0], offset: 5 },
      focus: { path: [1, 0], offset: 11 },
    };
    toggleMark(editor, "bold");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Paragraph 1", bold: true}]},
      {type: "p", children: [{text: "Parag", italics: true, bold: true}, {text: "raph 2", italics: true}]},
      {type: "p", children: [{text: "Paragraph 3"}, {text: "Paragraph 3a", bold: true}]},
      {type: "p", children: [{text: "Paragraph 4"}]},
    ]);
  })

  it("can remove bold mark across multiple nodes", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 5 },
      focus: { path: [2, 1], offset: 3 },
    };
    toggleMark(editor, "bold");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Parag", bold: true}, {text: "raph 1"}]},
      {type: "p", children: [{text: "Paragraph 2", italics: true}]},
      {type: "p", children: [{text: "Paragraph 3Par"}, {text: "agraph 3a", bold: true}]},
      {type: "p", children: [{text: "Paragraph 4"}]},
    ]);
  })

  it("can add bold mark to entire text node", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [3, 0], offset: 0 },
      focus: { path: [3, 0], offset: 11 },
    };
    toggleMark(editor, "bold");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Paragraph 1", bold: true}]},
      {type: "p", children: [{text: "Paragraph 2", italics: true, bold: true}]},
      {type: "p", children: [{text: "Paragraph 3"}, {text: "Paragraph 3a", bold: true}]},
      {type: "p", children: [{text: "Paragraph 4", bold: true}]},
    ]);
  })

  it("can add bold mark within text node", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [3, 0], offset: 3 },
      focus: { path: [3, 0], offset: 8 },
    };
    toggleMark(editor, "bold");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Paragraph 1", bold: true}]},
      {type: "p", children: [{text: "Paragraph 2", italics: true, bold: true}]},
      {type: "p", children: [{text: "Paragraph 3"}, {text: "Paragraph 3a", bold: true}]},
      {type: "p", children: [{text: "Par"}, {text: "agrap", bold: true}, {text: "h 4"}]},
    ]);
  })

  it("can add bold across multiple nodes", () => {
    resetEditor();
    for (let p of editor.children) {
      for (let text of p.children) delete text.bold;
    }
    editor.selection = {
      anchor: { path: [0, 0], offset: 3 },
      focus: { path: [3, 0], offset: 8 },
    };
    toggleMark(editor, "bold");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Par"}, {text: "agraph 1", bold: true}]},
      {type: "p", children: [{text: "Paragraph 2", italics: true, bold: true}]},
      {type: "p", children: [{text: "Paragraph 3Paragraph 3a", bold: true}]},
      {type: "p", children: [{text: "Paragrap", bold: true}, {text: "h 4"}]},
    ]);
  })

})

describe("toggleSimpleBlock", () => {

  const editor = createEditor();
  const resetEditor = () => {
    editor.children = [
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ];
  }

  it("can set h1 to p", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
    toggleSimpleBlock(editor, "p");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

  it("can set p to p", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [1, 0], offset: 0 },
      focus: { path: [1, 0], offset: 0 },
    };
    toggleSimpleBlock(editor, "p");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

  it("can lift first quote p up", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [2, 0, 0], offset: 0 },
      focus: { path: [2, 0, 0], offset: 0 },
    };
    toggleSimpleBlock(editor, "p");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "p", children: [{text: "Quote 1"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

  it("can lift second quote p up", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [2, 1, 1], offset: 0 },
      focus: { path: [2, 1, 1], offset: 0 },
    };
    toggleSimpleBlock(editor, "p");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
      ]},
      {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

  it("can lift third li up", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [3, 2, 0], offset: 0 },
      focus: { path: [3, 2, 0], offset: 0 },
    };
    toggleSimpleBlock(editor, "p");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
      ]},
      {type: "p", children: [{text: "Item 3"}]},
    ]);
  })

  it("can set p to h1", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [1, 0], offset: 0 },
      focus: { path: [1, 0], offset: 0 },
    };
    toggleSimpleBlock(editor, "h1");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "h1", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

  it("can remove h1", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
    toggleSimpleBlock(editor, "h1");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

  it("can set quote p to h2", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [2, 1, 0], offset: 0 },
      focus: { path: [2, 1, 0], offset: 0 },
    };
    toggleSimpleBlock(editor, "h2");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
      ]},
      {type: "h2", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

  it("can set multiple nodes to p when containing p", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 2 },
      focus: { path: [3, 1, 0], offset: 1 },
    };
    toggleSimpleBlock(editor, "p");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "p", children: [{text: "Quote 1"}]},
      {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
      {type: "p", children: [{text: "Quote 3"}]},
      {type: "p", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
      {type: "p", children: [{text: "Item 2"}]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

  it("can set multiple nodes to p when not containing p", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [2, 2, 0], offset: 0 },
      focus: { path: [3, 1, 0], offset: 0 },
    };
    toggleSimpleBlock(editor, "p");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
      ]},
      {type: "p", children: [{text: "Quote 3"}]},
      {type: "p", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
      {type: "p", children: [{text: "Item 2"}]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

  it("can set multiple nodes to h1", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [1, 0], offset: 2 },
      focus: { path: [3, 1, 0], offset: 0 },
    };
    toggleSimpleBlock(editor, "h1");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "h1", children: [{text: "Paragraph 2"}]},
      {type: "h1", children: [{text: "Quote 1"}]},
      {type: "h1", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
      {type: "h1", children: [{text: "Quote 3"}]},
      {type: "h1", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
      {type: "h1", children: [{text: "Item 2"}]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

  it("can set remove h1 from multiple nodes", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 2 },
      focus: { path: [2, 1, 0], offset: 0 },
    };
    toggleSimpleBlock(editor, "h1");
    expect(editor.children).toEqual([
      {type: "p", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
    ]);
  })

})

describe("toggleComplexBlock", () => {

  const editor = createEditor();
  const resetEditor = () => {
    editor.children = [
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ];
  }

  it("converts h1 to blockquote", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
    toggleComplexBlock(editor, "blockquote", "p");
    expect(editor.children).toEqual([
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Title"}]}
      ]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  })

  it("converts h1 to list", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 1 },
      focus: { path: [0, 0], offset: 1 },
    };
    toggleComplexBlock(editor, "ol", "li");
    expect(editor.children).toEqual([
      {type: "ol", children: [
        {type: "li", children: [{text: "Title"}]}
      ]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  })

  it("removes first quote paragraph", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [2, 0, 0], offset: 1 },
      focus: { path: [2, 0, 0], offset: 1 },
    };
    toggleComplexBlock(editor, "blockquote", "p");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "p", children: [{text: "Quote 1"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  });

  it("removes second quote paragraph", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [2, 1, 0], offset: 1 },
      focus: { path: [2, 1, 0], offset: 1 },
    };
    toggleComplexBlock(editor, "blockquote", "p");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
      ]},
      {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  });

  it("removes third quote paragraph", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [2, 2, 0], offset: 1 },
      focus: { path: [2, 2, 0], offset: 1 },
    };
    toggleComplexBlock(editor, "blockquote", "p");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
      ]},
      {type: "p", children: [{text: "Quote 3"}]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  });

  it("removes first list item", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [3, 0, 0], offset: 1 },
      focus: { path: [3, 0, 0], offset: 1 },
    };
    toggleComplexBlock(editor, "ul", "li");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "p", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  });

  it("converts first quote paragraph to list", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [2, 0, 0], offset: 1 },
      focus: { path: [2, 0, 0], offset: 1 },
    };
    toggleComplexBlock(editor, "ul", "li");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Quote 1"}]}
      ]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  });

  it("converts second quote paragraph to list", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [2, 1, 1], offset: 1 },
      focus: { path: [2, 1, 1], offset: 1 },
    };
    toggleComplexBlock(editor, "ul", "li");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]}
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
      ]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  });

  it("converts multiple simple blocks to list", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 1 },
      focus: { path: [1, 0], offset: 1 },
    };
    toggleComplexBlock(editor, "ul", "li");
    expect(editor.children).toEqual([
      {type: "ul", children: [
        {type: "li", children: [{text: "Title"}]},
        {type: "li", children: [{text: "Paragraph 2"}]},
      ]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 1"}]},
        {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  });

  it("converts multiple blocks to list, spanning complex blocks", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 1 },
      focus: { path: [2, 1], offset: 1 },
    };
    toggleComplexBlock(editor, "ul", "li");
    expect(editor.children).toEqual([
      {type: "ul", children: [
        {type: "li", children: [{text: "Title"}]},
        {type: "li", children: [{text: "Paragraph 2"}]},
        {type: "li", children: [{text: "Quote 1"}]},
        {type: "li", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
      ]},
      {type: "blockquote", children: [
        {type: "p", children: [{text: "Quote 3"}]},
      ]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  });

  it("removes quote when subselection", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [1, 0], offset: 1 },
      focus: { path: [3, 2], offset: 1 },
    };
    toggleComplexBlock(editor, "blockquote", "p");
    expect(editor.children).toEqual([
      {type: "h1", children: [{text: "Title"}]},
      {type: "p", children: [{text: "Paragraph 2"}]},
      {type: "p", children: [{text: "Quote 1"}]},
      {type: "p", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
      {type: "p", children: [{text: "Quote 3"}]},
      {type: "ul", children: [
        {type: "li", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "li", children: [{text: "Item 2"}]},
        {type: "li", children: [{text: "Item 3"}]},
      ]},
      {type: "p", children: [{text: "Paragraph 3"}]},
    ]);
  });

  it("converts everything to code block", () => {
    resetEditor();
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [4, 0], offset: 0 },
    };
    toggleComplexBlock(editor, "code", "codeline");
    expect(editor.children).toEqual([
      {type: "code", children: [
        {type: "codeline", children: [{text: "Title"}]},
        {type: "codeline", children: [{text: "Paragraph 2"}]},
        {type: "codeline", children: [{text: "Quote 1"}]},
        {type: "codeline", children: [{text: "Quote 2"}, {text: "Quote 2a", italics: true}]},
        {type: "codeline", children: [{text: "Quote 3"}]},
        {type: "codeline", children: [{text: "Item 1"}, {text: "Item 1a", underline: true}]},
        {type: "codeline", children: [{text: "Item 2"}]},
        {type: "codeline", children: [{text: "Item 3"}]},
        {type: "codeline", children: [{text: "Paragraph 3"}]},
      ]},
    ]);
  })

})