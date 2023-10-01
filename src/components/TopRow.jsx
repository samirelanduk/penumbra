import PropTypes from "prop-types";

const TopRow = props => {

  const { setText } = props;

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
    setText(contents);
  }

  return (
    <div className="w-full flex items-center justify-end px-6 border-b h-10 dark:border-gray-600">
      <div onClick={openClicked} className="cursor-pointer">Open</div>
    </div>
  );
};

TopRow.propTypes = {
  setText: PropTypes.func.isRequired
};

export default TopRow;