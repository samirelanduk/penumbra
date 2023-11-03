import { useContext } from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";
import Toolbar from "./Toolbar";
import { PreviewContext } from "@/contexts";

const TopRow = props => {

  const { document, setDocument } = props;

  const preview = useContext(PreviewContext);

  return (
    <div className={`w-full flex justify-start flex-shrink-0 items-center px-4 h-12 relative ${preview ? "" : "sm:justify-center"}`}>
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