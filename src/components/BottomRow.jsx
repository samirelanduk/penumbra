import PropTypes from "prop-types";

const BottomRow = props => {

  const { text } = props;

  const charCount = text.length;

  const words = text.match(/\b\w+\b/g);
  const wordCount = words ? words.length : 0;
    
  return (
    <div className="w-full border-t h-10 flex items-center text-sm text-gray-500 px-4 dark:bg-slate-800 dark:text-slate-200 dark:border-gray-600">
      <div>{charCount} character{charCount === 1 ? "" : "s"} </div>
      <div className="mx-2">|</div>
      <div>{wordCount} word{wordCount === 1 ? "" : "s"}</div>
    </div>
  );
};

BottomRow.propTypes = {
  text: PropTypes.string.isRequired
};

export default BottomRow;