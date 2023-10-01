import PropTypes from "prop-types";

const TopRow = props => {

  const { document, setDocument } = props;

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
  }

  return (
    <div className="w-full flex items-center justify-center px-6 border-b h-10 relative dark:border-gray-600">
      <div className="text-gray-500 text-sm">{document ? document.name : ""}</div>
      <div onClick={openClicked} className="cursor-pointer absolute right-6">Open</div>
    </div>
  );
};

TopRow.propTypes = {
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired
};

export default TopRow;