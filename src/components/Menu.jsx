import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const Menu = props => {

  const { document, setDocument } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [currentFileHandle, setCurrentFileHandle] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const canOpen = true;
  const canSave = Boolean(currentFileHandle);
  const canSaveAs = Boolean(document) && document.text.length > 0;
  const canClose = Boolean(currentFileHandle);

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
    setIsOpen(false);
  }

  const saveClicked = async () => {
    const writable = await currentFileHandle.createWritable();
    await writable.write(document.text);
    await writable.close();
    setDocument({...document, name: currentFileHandle.name});
    setIsOpen(false);
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
    setIsOpen(false);
  }

  const closeClicked = () => {
    setDocument(null);
    setCurrentFileHandle(null);
    setIsOpen(false);
  }

  const optionClass = "py-2 px-6 text-slate-600 cursor-pointer hover:bg-slate-100";
  const disabledOptionClass = `${optionClass} opacity-30 pointer-events-none`;
  const circleClass = "w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-300";

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)} ref={ref}
        className={`flex items-center gap-1 h-full absolute right-6 top-0 cursor-pointer transition-all duration-75 ${isOpen ? "rotate-90" : ""}`}
      >
        <div className={circleClass} />
        <div className={circleClass} />
        <div className={circleClass} />
      </div>
      <div className={`absolute top-12 right-8 w-48 border shadow border-gray-200 py-2.5 bg-white rounded-lg transition-all dark:border-0 duration-500 ${isOpen ? "" : "opacity-0 pointer-events-none"}`}>
        <div className={canOpen ? optionClass : disabledOptionClass} onClick={openClicked}>
          Open
        </div>
        <div className={canSave ? optionClass : disabledOptionClass} onClick={saveClicked}>
          Save
        </div>
        <div className={canSaveAs ? optionClass : disabledOptionClass} onClick={saveAsClicked}>
          Save As
        </div>
        <div className={canClose ? optionClass : disabledOptionClass} onClick={closeClicked}>
          Close
        </div>
      </div>
    </div>
  );
};

Menu.propTypes = {
  
};

export default Menu;