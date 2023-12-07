import { useContext } from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";
import Toolbar from "./Toolbar";
import { PreviewContext } from "@/contexts";

const TopRow = props => {

  const { document, setDocument } = props;

  const preview = useContext(PreviewContext);

  return (
    <div className={`w-full flex justify-start flex-shrink-0 items-center px-4 h-16 pt-1 relative sm:h-12 sm:pt-0 ${preview ? "sm:h-16 sm:pt-1" : "sm:justify-center"}`}>
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