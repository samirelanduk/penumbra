import { useState } from "react";
import PropTypes from "prop-types";

const TopRow = props => {

  const { document, setDocument } = props;

  const [currentFileHandle, setCurrentFileHandle] = useState(null);

  const openClicked = async () => {
    let fileHandle;
    try {
      [fileHandle] = await window.showOpenFilePicker({
        types: [{description: "Text", accept: {"text/*": [".txt", ".md"]}}],
        excludeAcceptAllOption: true,
        multiple: false,
      });
    } catch { return }
    const fileData = await fileHandle.getFile();
    const contents = await fileData.text();
    setDocument({text: contents, name: fileHandle.name});
    setCurrentFileHandle(fileHandle);
  }

  const saveClicked = async () => {
    const writable = await currentFileHandle.createWritable();
    await writable.write(document.text);
    await writable.close();
    setDocument({...document, name: currentFileHandle.name});
  }

  const saveAsClicked = async () => {
    let fileHandle;
    try {
      fileHandle = await window.showSaveFilePicker({
        types: [{description: "Text", accept: {"text/*": [".txt", ".md"]}}],
        suggestedName: document.name || "Untitled.txt",
      });
    } catch { return }
    const writable = await fileHandle.createWritable();
    await writable.write(document.text);
    await writable.close();
    setDocument({...document, name: fileHandle.name});
    setCurrentFileHandle(fileHandle);
  }

  const closeClicked = () => {
    setDocument(null);
    setCurrentFileHandle(null);
  }

  const canSaveAs = document && document.text.length > 0;

  return (
    <div className="w-full flex items-center justify-center px-6 border-b h-10 relative dark:border-gray-600">
      <div className="text-gray-500 text-sm">{document ? document.name : ""}</div>
      <div onClick={openClicked} className="cursor-pointer absolute right-6">Open</div>
      <div onClick={saveClicked} className={`cursor-pointer absolute right-24 ${currentFileHandle ? "" : "opacity-30 pointer-events-none"}`}>Save</div>
      <div onClick={saveAsClicked} className={`cursor-pointer absolute right-44 ${canSaveAs ? "" : "opacity-30 pointer-events-none"}`}>Save As</div>
      <div onClick={closeClicked} className={`cursor-pointer absolute right-72 ${document ? "" : "opacity-30 pointer-events-none"}`}>Close</div>

    </div>
  );
};

TopRow.propTypes = {
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired
};

export default TopRow;