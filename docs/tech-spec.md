# Penumbra Technical Specification

The purpose of this document is to allow a developer to understand how Penumbra works well enough that they can begin to work on the codebase - whether coming to it for the first time, or coming back to it after a long time without without working on it.

It outlines how the underlying slate.js technology works, and the core concepts behind how Penumbra is architectured.

## The Editor Object

The most important object is the **editor** object.
This object contains the full state of the document as it is displayed at any given time.
It is created with the `createEditor` function:

```javascript
const [editor] = useState(() => createElement());
```

There are a few things to note about this creation:

- The object is stored in react state - otherwise each time the component re-rendered due to some other state changing, a new, blank editor would be created with reset contents.
- The function is wrapped in a wrapper function, rather than being given to `useState` directly.
This tells react to only run `createElement` the first time the component is rendered.
If this wasn't done, it wouldn't reset the value of `editor` on each render, but it would needlessly call the function every time to produce a value that was then discarded.
- The 'setter' function that `useState` returns isn't used or needed.
In slate.js, you don't change the state of the document by modifying the editor object directly - it manages its own internal state.

The editor object has the properties specified by the editor **interface**.
In slate.js, every object type is defined by an interface which (1) defines the attributes it must have to be a valid instance of that interface, and (2) provides helper functions which can act on instances of the interface.
The `Editor` interface defines many attributes and has a number of helper functions, some of which will be outlined below.

## React Components

The actual rendering of the editor is done using a react component called `Editable`.
This obviously needs access to the editor object, but it does not take it as a prop, instead it has to exist inside a context provider - the `Slate` component, which is what takes the editor as a prop.
This is done so that you can have other components around the text editor component itself with access to the editor object, such as toolbars etc., without needing to pass the editor around as a prop everywhere.

The attribute of the editor that stores the document contents is `children`, which is a list of slate.js elements.
How these are structured will be explained more below, but for now it is important to note that editor's `children` is just an empty array when first initialised, which is not a valid document.
For this reason you must also specify what the `initialValue` will be as a prop - this is what will be rendered initially, and then after the first change it will always be the editor's `children` attribute that is used.

```jsx
return (
  <Slate editor={editor} initialValue={[{children: [{text: ""}]}]}>
    <Editable />
  </Slate>
)
```

In this example, the simplest valid document is passed as the initial value.

As alluded to above, `Slate` is not a controlled component.
You don't change the contents of the editor by calling some `setEditor` function which causes `Slate` to re-render.
Likewise changing what is passed to `initialValue` later on will not alter the state of the `Editable`.

The editor object as created is actually a somewhat framework-agnostic, abstract object and while it can be passed directly to the `Slate` component, it is missing some attributes and behaviours that allow it to respond to key strokes etc.
These are added with the `withReact` function, so the actual initial state setting should be:

```javascript
const [editor] = useState(() => withReact(createElement());
```

The specific functionality that this adds governs how slate.js communicates with the DOM.
Without this, when a character is typed, the editor object's `children` attribute will be updated, but it will not take any action to trigger a re-rendering of the react element, so nothing will appear on screen.

`withReact` is an example of a **plugin** - a function which takes an editor object and returns an updated copy of that editor with extra attributes and functionality.
Other plugins will be outlined below.

## Slate Documents

Slate represents documents as a graph of **nodes**, where the nodes are one of three types:

- The editor object is the root node, and there is only one.
- **Element** nodes.
The editor's `children` is an array of elements, and the `Element` interface specifies only that they too must have a `children` attribute.
This must be an array of either other elements, or...
- **Text** nodes.
These are the 'leaves' of the graph as they have no children themselves, just the `text` attribute specified by the `Text` interface.

The actual content of the document is all contained within the text nodes, with the element nodes providing semantic meaning.
A text node cannot be a direct child of the editor though, it needs at least one element wrapper around it.

The default rendering that Slate does essentially treats each element as a `div` and each text node as a `span`.

## Slate Locations

A node can be identified by its **path** - an array of numbers that navigates through the `children`.
For example, in the first example the editor has a path of `[]`, the first paragraph is `[0]`, the text node within it is `[0][0]`, the second paragraph is `[1]` etc.

A **point** is a location within a text node, and is an object with a `path` attribute and an `offset` attribute - essentially a possible cursor position.

A **range** is an object with an `anchor` point (where the user first clicked) and `focus` point (where the user lifted the mouse button) - essentially a subsection of a document.

These objects are governed by the `Path`, `Point` and `Range` interfaces respectively.

The editor object has a `selection` attribute which can either be `null` (nothing currently selected and no cursor position) or a range object to indicate what is currently selected, or where the cursor currently is (in which case the anchor and focus will be the same point).

## Default Slate Behaviour

In addition the default rendering, some custom behaviours are also enabled by default:

- Clicking a location on the `Editable` will update the editor's `selection` to be a range object matching the corresponding location within the document graph.
- Clicking and dragging will update the editor's `selection` a range with a different anchor and focus, and show the text as highlighted.

- When a character is typed, it will be added to the currently selected (according to the editor's `selection`) text node's text.
If there's a selection that spans multiple characters or nodes, typing a character will replace the selected content with the typed character.
- Hitting enter will either create a new element - as a sibling of the immediate parent of whatever text node was selected if the cursor was at the end of a text node, or split the text node in two if the cursor was in the middle.

There are others, such as copying and backspacing, but the basic gist is that it provides the minimal functionality expected of a bare text box.

One common text-box feature not provided by default is undo/redo functionality, as unlike the other features it introduces a non-negligible performance hit as it needs to keep a lot of revisions in memory.
This can be enabled using the `withHistory` plugin when first creating the editor object.

None of these changes to the editor's state cause any kind of component re-render, because it is not stored in react's state system.
You can 'listen' for changes using an `onChange` function that is optionally passed to the `Slate` component.
This will fire every time the editor's `children` attribute changes, and gets passed that array as an argument.

## Custom Penumbra Elements

The only attributes that elements and text nodes are required to have by their interfaces are `children` and `text` respectively.
You can give them other attributes though, and by convention the way to provide custom formatting etc. is through these attributes.

In Penumbra, text nodes can have `italics`, `bold`, `underline` and `strikethrough` boolean attributes for example, to indicate what formatting should be applied to them.
Note that slate.js does not come with any logic for what to do with these attributes, and they could be called anything - the `Editable` needs to be told what to do with them when rendering (see below).
It is Penumbra's own specification that states that these are the allowed text node attributes.

Likewise, elements have a `type` attribute in Penumbra which specifies what kind of element they are and how to render them.
Again the `type` attribute is not part of the slate.js core, though it is the convention to use this attribute for this purpose.

Penumbra defines certain 'simple' element types - simple because they are each top-level, direct containers of text nodes:

- Paragraph elements (`type="p"`).
- H1 elements (`type="h1"`).
- H2 elements (`type="h2"`).
- H3 elements (`type="h3"`).

There are also four 'complex' element types because they have child elements before the text nodes.

- Block quote elements (`type="blockquote"`) have a list of paragraph elements as child elements.
- Unordered list elements (`type="ul"`) have a list of list item elements (`type="li"`) .
- Ordered list elements (`type="ol"`) also have a list of list item elements.
- Code block elements (`type="code"`) have a list of `codeline` elements.

## Custom Rendering

If slate.js is given a document with the above element types, by default it won't do anything special with them - it will continue to render all elements as unstyled `div` elements and all text nodes as unsettled `span` elements.
It needs to be told how to render them if them if something else is desired.

One of the simplest ways to customise rendering is to define certain elements as inline - by default they are all block.
But you can override the editor's `isInline` function in a custom plugin to return `true` or `false` depending on whatever criteria or attributes of the element you like.
If they are considered inline, they will be able to be siblings of text nodes and won't be their own block-level `div`.

This is rarely enough customisation though, so the `Editable` component has two props for managing rendering - `renderLeaf` and `renderElement`.

If a `renderLeaf` function is given, this function will be called on every text node when rendering, overriding the default `span` generating renderer.
This function has access to all the attributes of the text node, and can be used to do anything you like.
In Penumbra, it is used to create a custom class name for a `span` element with Tailwind classes, and then the `span` element is returned.

Likewise, `renderElement` will (if given) be used on every slate.js element to generate the relevant react element.
In Penumbra, different elements are returned based on the `type` attribute, each with their own Tailwind classes governing how they appear.

Some typical conventions with all this are to wrap the two functions in `useCallback` functions to prevent the function being re-defined on every render, and to use custom React components defined outside the function to make the whole thing more readable.
Penumbra adheres to both of these.

This is the mechanism by which you control how a document looks in slate.js, though it does not control how the different types are enabled and disabled.
If your `initialValue` has these custom types they will be rendered correctly, but thus far there is no way to take a blank document and add content with these custom types.
This logic is handled elsewhere in Penumbra, and requires an understanding of how slate.js updates its own state.

## Updating the Document

The editor's state is not updated by directly modifying its attributes.
Special functions are used to perform these updates, which exist in a hierarchy of increasing complexity - operations, transforms and commands.

### Operations

Operations are low-level modification primitives that perform the most basic, irreducible changes to the editor.
Examples include like 'insert this text into this node at this location', 'remove this node' and 'set the selection to be this range'.

They are just objects, defined by the `Operation` interface, and are applied by passing them to the editor's `apply` function.

Because they are so simple, it is easy to define their inverse (allowing undo/redo to work), and collaborative editing becomes more straightforward (though Penumbra doesn't make use of this, being a strictly offline-only tool).

### Transforms

Transforms batch a set of operations together to do something more useful.
Every transform is a method of the `Transforms` interface, and each one takes the editor as input and returns a copy of it (the editor object itself should be immutable).

The second argument to transforms tends to be an object of parameters, such as `at` (the path to a location in the document tree) or `match` (a function which takes a node and returns true or false to determine which nodes to operate on).
The precise parameters will vary between transforms.

Examples of transforms used in Penumbra are:

- `insertNodes` - inserts new nodes into the document at a given location.
- `select` - sets the editor's `selection` attribute to be a specified location.
- `setNodes` - sets certain attributes on specified nodes.
- `liftNodes` - brings an element to the root of the document.
If it had a parent node, this may need to be split if the element was in the middle of it, or removed if it was the only child.
- `wrapNodes` - creates a new parent element around a set of elements.

### Commands

Commands are high-level actions which always apply to current selection - you don't specify the location yourself.
They are methods of the editor object, and call transforms and operations to achieve whatever they achieve.

Commands are typically run in response to an event, such a button click or keyboard press.
The default behaviour outlined above that slate.js is achieved by mapping certain basic commands to event handlers in the `Editable` component, such as `onKeyDown`, and these can be overridden, or new ones added with custom plugins.

## The Toolbar

Penumbra has a `Toolbar` component which lives inside the `Slate` context (and so has access to the `editor` object), but above the `Editable`.
It allows the users to toggle inline marks, and change the element types of the block elements.

Each of the four possible marks (bold, italics, underline and strikethrough) has a button - the `isMarkActive` function is used to determine whether it should be shown as enabled or not, and the `toggleMark` function is used to turn marks on or off on the selected text nodes.
Penumbra handles any splitting or merging of text nodes that might be needed.

There are also buttons for the block elements, both complex and simple.
The `isBlockActive` is similarly used as above, to determine of the block specified is active by checking the top-level elements for the type in question.
There are separate toggles for simple and complex blocks:

- `toggleSimpleBlock` - gets all the 'base' elements (those which are immediate containers of text nodes) in the selection and sets them to the type in question of it is not active, or to `"p"` if it is active anywhere in the selection - and raises them to the top level if needed.
- `toggleComplexBlock` - is slightly more involved, and essentially converts all relevant base elements to the relevant child element type, then wraps them all in the parent element type.

Penumbra handles a lot of the element splitting and removal that is required of lifting child elements out of their parent etc.

In addition the pressing the toolbar buttons, the component also registers some event listeners to allow them to be activated by keyboard shortcut.

The toolbar therefore provides a method for changing the document structure in an intuitive way.

## Typing

Slate.js comes with some default behaviours when typing.
New characters are added to the end of the currently selected text node etc, the return key creates a new element as described above, etc.

For the most part, Penumbra leaves these defaults in place.
It does however override the `insertBreak` method via a custom plugin, so that if the cursor is at the end of a heading, the next element created is a paragraph, not a new heading.

It also responds to certain patterns in text to modify the current block type:
- Typing "- " will make the current block a bullet point, using the functions defined for the toolbar.

## Preview Mode

The full Penumbra text interface is provided as the `Penumbra` element, and the home page just renders this.
The reason the logic isn't added directly into the home page is because the component is actually used on the 'about' page too, as a sort of demo.

For this reason, the `Penumbra` element takes a single boolean prop, `preview`, which is passed into a react context wrapper.
Various parts of the interface behave differently when `preview` is true - the toolbar is smaller, modals are smaller, certain paddings are changed etc.

## Document Info

In addition to the `editor` state, the `Penumbra` component defines a `document` state object, for tracking information about the current document.
It contains the current number of words and characters, the document name, a settings object for document-specific settings (see below) and the password (see below).

This is used to display word counts etc. at the bottom of the screen, and to keep track of last save etc.

## Settings

Penumbra has settings for the following:

- Whether dark mode should be on, off, or default to the system preferences.
- The font used in documents.
- The text size in documents (small, medium or large).
- Whether to show character counts.
- Whether to show word counts.

These are stored in a single object that is initialised on first render.
It looks in local storage to see if any values are defined there, and if not creates defaults.
This object is then added to a context provider so that they can be accessed wherever they need to be.

There is a settings modal which modifies these values.
Whenever a value is changed, Penumbra also updates the copy of the settings in local storage, so that next time the app is opened the change will be persisted.
It can't *only* use local storage however, as the app would not re-render if only local storage changed.

Many of these settings can also be set at the document level.
The `document` object has a `settings` attribute with its own values (defaults to `null` which means to use global settings).
Any part of the app that uses settings will first look for a value here before checking the global settings.

## Saving/Loading

When saving a never previously saved document, or when 'saving as' a new document:

1. The user is prompted to provide a new password.
2. A copy of the `document` object is made, the `password` and `fileHandle` attributes are removed from this copy, and the editor's `children` contents are added
3. This object is JSON stringified, and this string is encrypted to an `ArrayBuffer` object using the `window.crypto` API, via the password given by the user.
4. This encrypted data is prepended with header information such as the salt and IV needed to decrypt, the version of Penumbra used, and the locations of the various pieces of information within the final `Unit8Array` bytestring.
5. A `fileHandle` object is created by prompting the user to select a location on disk, and the bytestring saved to that location.
6. The `document` state is updated with the file handle, the new document name (from the filename picked), the password picked, and the word and character counts.

When saving an existing document (i.e.
the `document` object has a file handle and password associated with it), the above steps are done using the existing file handle and password.

When opening an encrypted file:

1. A `fileHandle` object is created by prompting the user to select a location on disk, and the encrypted bytestring loaded from the file selected.
2. The user is asked for the password for the file they have just opened.
3. A blank `document` object is initialised.
4. The bytestring is decrypted into a `document` object (the reverse of the above) and the two `document` objects merged.
5. The `document` is updated with password and file handles, and the copy of the editor's nodes is removed.
6. The `editor` object's `onChange` method is called with the new nodes in the `document`'s `slate` attribute (as the text editor doesn't re-render just because `document` changes).