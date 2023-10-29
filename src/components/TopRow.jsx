import PropTypes from "prop-types";
import Menu from "./Menu";

const TopRow = props => {

  const { document, setDocument } = props;

  return (
    <div className="w-full flex flex-shrink-0 items-center justify-center px-6 h-12 relative">
      <div className="text-gray-500 text-sm">{document.name || ""}</div>
      <Menu document={document} setDocument={setDocument} />
    </div>
  );
};

TopRow.propTypes = {
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired,
};

export default TopRow;