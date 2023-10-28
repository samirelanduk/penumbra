import { useState } from "react";
import PropTypes from "prop-types";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const TextEditor = props => {

  const { document, setDocument } = props;

  const [editor] = useState(() => withReact(createEditor()));

  const initialValue = [{type: "p", children: [{ text: ""}]}];
  
  return (
    <div className="flex-grow overflow-y-scroll">
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          autoFocus
          className="w-full block px-4 outline-none py-4 bg-inherit resize-none max-w-none prose lg:prose-xl md:px-[calc((100vw-738px)/2)] md:py-6 lg:px-[calc((100vw-800px)/2)] lg:py-8 dark:text-inherit"
        />
      </Slate>
    </div>
  );
};

TextEditor.propTypes = {
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired
};

export default TextEditor;