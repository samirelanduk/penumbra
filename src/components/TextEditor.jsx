import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const TextEditor = props => {

  const { document, setDocument } = props;

  const ref = useRef(null);

  useEffect(() => {
    ref.current.innerText = document.text;
  }, [document.name])
  
  useEffect(() => {
    ref.current.focus();
    const onUnload = e => {
      e.preventDefault();
      if (!document) return;
      if (document.name) {
        if (document.text.length === document.initialCharacterCount) return;
      } else {
        if (!document.text) return;
      }
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [document]);

  const onInput = () => {
    setDocument({...document, text: ref.current.innerText})
  }

  return (
    <div className="flex-grow">
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
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