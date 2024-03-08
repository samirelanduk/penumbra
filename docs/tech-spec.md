# Penumbra Technical Specification

The purpose of this document is to allow a developer to understand how Penumbra works well enough that they can begin to work on the codebase - whether coming to it for the first time, or coming back to it after a long time without without working on it.
It outlines how the underlying slate.js technology works, and the core concepts behind how Penumbra is architectured.

## Slate Concepts

Penumbra uses slate.js to manage rich text.
To understand how Penumbra works, the core principles of slate.js must be understood.

Slate represents documents as a tree of **nodes**, of which there are three types:

- The root **editor** node.
Must have a `children` attribute which is an array of element nodes.
- Container **element** nodes.
Must have a `children` attribute which is an array of nodes, and often has a `type` attribute indicating what type of element it is.
- Leaf-level **text** nodes.
Must have a `text` attribute.

Elements are typically used to represent block level HTML elements.
For example, a simple three paragraph document might be represented as:

```javascript
{
  children: [
    {
      type: "paragraph",
      children: [
        {
          text: "I am paragraph 1."
        }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          text: "I am paragraph 2. I have two sentences."
        }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          "text": "I am paragraph 3."
        }
      ]
    }
  ]
}
```

The 'paragraph' type isn't part of slate.js - there are no built-in types.
You can define whatever types you like, and tell slate.js how to render them later.
You can nest elements within other elements too:

```javascript
{
      type: "paragraph",
      children: [
        {
          text: "I am a sentence with "
        },
        {
          type: "link",
          url: "https://wikipedia.org",
          children: [
            {
              text: "a link to wikipedia"
            }
          ] 
        },
        {
          text: " in it.",
          mark: "italic"
        },
      ]
    },
```

These object types - editor, element, text, and the generic node they are subtypes of - all have specific **interfaces** in Slate which define what attributes they must have (just `children` in the case of elements etc.) These interfaces also have static methods which can act on objects which adhere to the interfaces.

A node can be identified by its **path** - an array of numbers that navigates through the `children`.
For example, in the first example the editor has a path of `[]`, the first paragraph is `[0]`, the text node within it is `[0][0]`, the second paragraph is `[1]` etc.
A **point** is a location within a text node, and is an object with a `path` attribute and an `offset` attribute - essentially a possible cursor position.
A **range** is an object with an `anchor` point (where the user first clicked) and `focus` point (where the user lifted the mouse button) - essentially a region of a document that can be selected.

The editor object has a `selection` attribute which can either be `null` (nothing currently selected) or a range object to indicate what is currently selected (or where the cursor is).

The document is updated using **operations**, **transforms**, and **commands**:

- Operation - low-level modification primitives.
Things like 'insert this text into this node at this location', 'remove this node' and 'set the selection to be this range'.
They are performed using the editor object's `apply` method, which takes an object describing the operation.

- Transform - changes the document (returns updated copy - document immutable).
Runs one or more operations.
They are all methods of the `Transforms` interface, which takes the editor as the first argument, and then an object of parameters.
Examples include `Transforms.unwrapNodes`, `Transforms.select` and `Transforms.move`.

- Commands - high-level action which applies to current selection.
Calls one or more transforms.
They don't take location parameters, because they always apply to whatever is currently selected.
They are methods of the editor object itself.

An editor object is created using the `createEditor()` function, which creates the base object.
You can add your own custom commands etc.
by writing a function that takes an editor and returns one with the new method.

In the react itself, there is the `Slate` component which takes the editor object and keeps track of state, and then somewhere nested within it the `Editable` component, which provides the actual text editor interface itself and renders the document nodes.
It knows how to render the different node types because of callback functions that are passed to it.

## State

In Penumbra, the interface is provided by the `Penumbra` component.
This is its own component so that it can be rendered full-screen on the main page, and in preview mode on the about page.

It has two pieces of state - `document` and `editor`.

The `document` object describes the currently loaded document, and has the following keys:

- `slate` - a list of Slate nodes.
To update the text on screen, `document` must be updated so that this attribute contains the desired content.
- `name` - The name of the document (`null` if unsaved).
- `initialCharacterCount` - the number of characters the document had last time it was saved.
- `initialWordCount` - the number of words the document had last time it was saved.
- `password` - the password for this document, stored in memory so that the user can quickly save without needed to re-enter the password.
- `fileHandle` - a pointer to the file on disk, again so that the user can quickly save without needing to tell the app where the file is.
This is `null` on unsaved documents.

The `editor` object is a Slate object, created by its `createEditor` function.
It contains the nodes of the text on screen, as well as helper methods - including those added by Slate's `withReact` and `withHistory` and Penumbra's `withPenumbraCommands`.

Note that both `document` and `editor` objects contain the currently displayed text nodes - but it is `editor`'s copy that Slate actually uses.
The nodes in `document`'s `slate` attribute are a maintained copy that is used when saving.

## Typing

The `TextEditor` component that makes up the middle row is essentially just a Slate `Editable` component.
It has props for dictating how it should render different node types, but the state that governs the nodes themselves is taken from the `Slate` context it is wrapped in.
This takes:

- An `editor` object.
- An `initialValue` set of nodes, for it to display when first rendering.
- An `onChange` method, which gets passed the current set of nodes whenever the text changes.

Whenever text is entered or changed, the `onChange` method updates the `document` object so that it always has the latest nodes, but the `Editable` does not get its state from `document` - this is only done so that when saving Penumbra has access to the latest state.
The `Editable` keeps track of its own state, and lets Penumbra know about it, rather than Penumbra storing the state and making it re-render every time it changes.

## Toolbar

The default behaviour of the `Editable` component just creates a new element on each return key, so it can just create a simple node of element nodes in series, each with a single text node.

The toolbar in Penumbra is used to change what those nodes are which, along with the instructions passed to the component for how to render them, creates rich text documents.
The toolbar is divided into two sections, broadly for block level changes on the left, and text node mark changes on the right.

Each button on the toolbar has an active state and an inactive state, depending on whether the currently selected text has whatever that button represents.
Penumbra has two functions, `isBlockActive` and `isMarkkActive` to detect whether this is so, with each taking the editor object, and the string representation of the block/mark being checked:

- `isBlockActive` calls the `Editor.nodes` function which returns the nodes in the currently selected region which match a given criteria - in this case block-level elements of the specified `type`.
If matches are found, this function returns `true` - otherwise `false`.
- `isMarkActive` calls the `Editor.marks` helper method which returns all the marks set on the current text, and checks whether the one given is there.

Penumbra also has two functions for toggling a toolbar button's state - `toggleBlock` for the block level changes, and `toggleMark` for mark level changes.

- `toggleBlock` checks to see if the currently selected text is of the type specified (using `isBlockActive`) and uses `Transforms.setNodes` to set the type of the selected nodes to the new format if not, or to "p" if they are.

- `toggleMark` checks to see if the currently selected text has that mark active (using `isMarkActive`) and calls `Editor.removeMark` if it does, `Editor.addMark` if not.

The interface also listens for various keyboard shortcuts which are tied to the toolbar buttons.

## Saving/Loading

When saving a never previously saved document, or when 'saving as' a new document:

1. The user is prompted to provide a new password.
2. A copy of the `document` object is made, and the `password` and `fileHandle` attributes are removed from this copy.
3. This object is JSON stringified, and this string is encrypted to an `ArrayBuffer` object using the `window.crypto` API, via the password given by the user.
4. This encrypted data is prepended with header information such as the salt and IV needed to decrypt, the version of Penumbra used, and the locations of the various pieces of information within the final `Unit8Array` bytestring.
5. A `fileHandle` object is created by prompting the user to select a location on disk, and the bytestring saved to that location.
6. The `document` state is updated with the file handle, the new document name (from the filename picked), the password picked, and the word and character counts.

When saving an existing document (i.e. the `document` object has a file handle and password associated with it), the above steps are done using the existing file handle and password.

When opening an encrypted file:

1. A `fileHandle` object is created by prompting the user to select a location on disk, and the encrypted bytestring loaded from the file selected.
2. The user is asked for the password for the file they have just opened.
3. A blank `document` object is initialised.
4. The bytestring is decrypted into a `document` object (the reverse of the above) and the two `document` objects merged.
5. The `document` is updated with password and file handles.
6. The `editor` object's `onChange` method is called with the new nodes in the `document`'s `slate` attribute (as the text editor doesn't re-render just because `document` changes).



