import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const TextEditor = props => {

  const { text, setText } = props;

  const ref = useRef(null);
  
  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className="flex-grow ">
      <textarea
        ref={ref}
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full block h-full px-4 outline-none py-4 resize-none max-w-none prose lg:prose-xl md:px-[calc((100vw-738px)/2)] md:py-6 lg:px-[calc((100vw-800px)/2)] lg:py-8 dark:bg-slate-800 dark:text-slate-200"
      />
    </div>
  );
};

TextEditor.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired
};

export default TextEditor;