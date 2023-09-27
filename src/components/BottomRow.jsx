import PropTypes from "prop-types";

const BottomRow = props => {

  const { text } = props;

  const charCount = text.length;

  return (
    <div className="w-full border-t h-10 flex items-center text-sm text-gray-500 px-4">
      <div>{charCount} character{charCount === 1 ? "" : "s"} </div>
    </div>
  );
};

BottomRow.propTypes = {
  text: PropTypes.string.isRequired
};

export default BottomRow;