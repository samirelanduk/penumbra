import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { innerHtmlToMarkdown } from "../utils.js";

const TextEditor = props => {

  const { document, setDocument } = props;

  const ref = useRef(null);
  const selectionRef = useRef(null);

  useEffect(() => {
    ref.current.innerText = document.text;
  }, [document.name])
  
  useEffect(() => {
    ref.current.focus();
  }, [document]);

  const onInput = () => {
    setDocument({...document, text: innerHtmlToMarkdown(ref.current.innerHTML)})
  }

  const editorOnBlur = () => {
    const selection = window.getSelection();
    if (selection) {
      selectionRef.current = selection.getRangeAt(0);
    }
  }

  const makeSelectedTextBold = () => {
    if (!selectionRef.current) return;
    const selection = window.getSelection();
    selection.removeAllRanges(); 
    selection.addRange(selectionRef.current);
    const range = selectionRef.current.cloneRange();
    if (range.collapsed) return;
    const newNode = window.document.createElement("b");
    newNode.appendChild(range.extractContents());
    range.insertNode(newNode);
    range.selectNodeContents(newNode);
    selection.removeAllRanges();
    selection.addRange(range); 
    onInput();
  }
  
  

  return (
    <div className="flex-grow">
      <div onClick={makeSelectedTextBold}>Make Bold</div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onBlur={editorOnBlur}
        onInput={onInput}
        className="w-full block h-full px-4 outline-none py-4 bg-inherit resize-none max-w-none prose lg:prose-xl md:px-[calc((100vw-738px)/2)] md:py-6 lg:px-[calc((100vw-800px)/2)] lg:py-8 dark:text-inherit"
      />
    </div>
  );
};

TextEditor.propTypes = {
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired
};

export default TextEditor;