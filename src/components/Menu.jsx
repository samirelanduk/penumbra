import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { countWords, makeDocument } from "@/utils";
import { openFile, saveFile } from "@/files";
import EncryptModal from "./EncryptModal";
import DecryptModal from "./DecryptModal";
import { encrypt } from "@/encryption";
import ErrorModal from "./ErrorModal";
import { plainText } from "@/serialize";
import { ReactEditor, useSlate } from "slate-react";
import { Editor, Transforms } from "slate";
import BrowserWarning from "./BrowserWarning";
import Link from "next/link";

const Menu = props => {

  const { document, setDocument } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [control, setControl] = useState("Ctrl");
  const [browserSupported, setBrowserSupported] = useState(true);
  const [showEncryptModal, setShowEncryptModal] = useState(false);
  const [encryptedBytestring, setEncryptedBytestring] = useState(null);
  const [openedFileHandle, setOpenedFileHandle] = useState(null);
  const [error, setError] = useState("");
  const editor = useSlate();
  const ref = useRef(null);

  useEffect(() => {
    const onClick = e => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const isMac = navigator.userAgent.includes("Mac");
    setControl(isMac ? "⌘" : "Ctrl");
    if (!window.showOpenFilePicker) setBrowserSupported(false);
  }, [])

  const canOpen = browserSupported;
  const text = plainText(document.slate);
  const canSave = browserSupported && Boolean(document && document.fileHandle);
  const canSaveAs = browserSupported && Boolean(document) && text.length > 0;
  const canClose = browserSupported && Boolean(document && document.fileHandle);

  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === "o" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (canOpen) openClicked();
      } else if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (e.shiftKey) {
          if (canSaveAs) saveAsClicked();
        } else {
          if (canSave) {
            saveClicked();
          } else if (canSaveAs) {
            saveAsClicked();
          }
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [document, canOpen, canSave, canSaveAs]);

  const openClicked = async () => {
    let contents = null; let fileHandle = null;
    try {
      [contents, fileHandle] = await openFile();
    } catch (err) {
      setError(err.message);
    }
    if (!contents) return;
    setEncryptedBytestring(contents);
    setOpenedFileHandle(fileHandle);
    setIsOpen(false);
  }

  const closeDecryptModal = () => {
    setEncryptedBytestring(null);
    setOpenedFileHandle(null);
  }

  const saveClicked = async () => {
    const bytestring = await encrypt(document, document.password);
    await saveFile(document.fileHandle, bytestring);
    const text = plainText(document.slate);
    setDocument({
      ...document,
      name: document.fileHandle.name,
      initialCharacterCount: text.length,
      initialWordCount: countWords(text),
    });
    setIsOpen(false);
  }

  const saveAsClicked = () => {
    setShowEncryptModal(true);
  }

  const closeClicked = () => {
    const document = makeDocument();
    setDocument(document);
    setIsOpen(false);
    editor.children = document.slate;
    const point = { path: [0, 0], offset: 0 }
    editor.selection = { anchor: point, focus: point };
    editor.history = { redos: [], undos: [] }; 
    setTimeout(() => {
      editor.onChange(document.slate);
      ReactEditor.focus(editor);
      Transforms.select(editor, Editor.end(editor, []));
    }, 0);
  }

  const optionClass = "py-2 px-6 text-slate-600 cursor-pointer flex items-baseline justify-between hover:bg-slate-100";
  const disabledOptionClass = `${optionClass} opacity-30 pointer-events-none`;
  const circleClass = "w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-300";
  const controlClass = "text-gray-400 text-xs";

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
      <div className={`absolute z-50 top-12 right-8 w-56 border shadow border-gray-200 py-2.5 bg-white rounded-lg transition-all dark:border-0 duration-500 ${isOpen ? "" : "opacity-0 pointer-events-none"}`}>
        {!browserSupported && <BrowserWarning />}
        <div className={canOpen ? optionClass : disabledOptionClass} onClick={openClicked}>
          Open <span className={controlClass}>{control} O</span>
        </div>
        <div className={canSave ? optionClass : disabledOptionClass} onClick={saveClicked}>
          Save <span className={controlClass}>{control} S</span>
        </div>
        <div className={canSaveAs ? optionClass : disabledOptionClass} onClick={saveAsClicked}>
          Save As <span className={controlClass}>{control} ⇧ S</span>
        </div>
        <div className={canClose ? optionClass : disabledOptionClass} onClick={closeClicked}>
          Close
        </div>
        <Link href="/about" className={optionClass}>
          About
        </Link>
      </div>
      {showEncryptModal && (
        <EncryptModal
          setShow={setShowEncryptModal}
          document={document}
          setDocument={setDocument}
        />
      )}
      {!!encryptedBytestring && !!openedFileHandle && (
        <DecryptModal
          filename={openedFileHandle.name}
          fileHandle={openedFileHandle}
          setShow={closeDecryptModal}
          bytestring={encryptedBytestring}
          setDocument={setDocument}
        />
      )}
      {error && <ErrorModal message={error} setShow={setError} />}
    </div>
  );
};

Menu.propTypes = {
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired
};

export default Menu;