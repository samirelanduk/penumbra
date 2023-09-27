import PropTypes from "prop-types";

const TextEditor = props => {

  const { text, setText } = props;

  return (
    <div className="flex-grow">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full h-full outline-none p-4"
      />
    </div>
  );
};

TextEditor.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired
};

export default TextEditor;