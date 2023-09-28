import PropTypes from "prop-types";

const TextEditor = props => {

  const { text, setText } = props;

  return (
    <div className="flex-grow">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full block h-full px-4 outline-none py-4 resize-none max-w-none prose lg:prose-xl md:px-[calc((100vw-738px)/2)] lg:px-[calc((100vw-800px)/2)]"
      />
    </div>
  );
};

TextEditor.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired
};

export default TextEditor;