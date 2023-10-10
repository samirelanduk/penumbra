import { useState } from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";

const TopRow = props => {

  const { document, setDocument, fileHandle, setFileHandle } = props;

  return (
    <div className="w-full flex items-center justify-center px-6 h-12 relative">
      <div className="text-gray-500 text-sm">{document ? document.name : ""}</div>
      <Menu
        document={document} setDocument={setDocument}
        fileHandle={fileHandle} setFileHandle={setFileHandle}
      />
    </div>
  );
};

TopRow.propTypes = {
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired,
  fileHandle: PropTypes.object,
  setFileHandle: PropTypes.func.isRequired
};

export default TopRow;