import PropTypes from "prop-types";
import Menu from "./Menu";
import Toolbar from "./Toolbar";

const TopRow = props => {

  const { document, setDocument } = props;

  return (
    <div className="w-full flex justify-start flex-shrink-0 items-center px-4 h-12 relative sm:justify-center">
      <Toolbar />
      <Menu document={document} setDocument={setDocument} />
    </div>
  );
};

TopRow.propTypes = {
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired,
};

export default TopRow;