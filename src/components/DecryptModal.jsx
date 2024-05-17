import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { decrypt } from "@/encryption";
import { countWords, makeDocument } from "@/utils";
import { ClipLoader } from "react-spinners";
import { plainText } from "@/serialize";
import { Editor, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

const DecryptModal = props => {

  const { filename, bytestring, setShow, fileHandle, setDocument } = props;

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const ref = useRef(null);

  useEffect(() => ref.current.focus(), []);

  const editor = useSlate();

  const decryptClicked = async () => {
    setLoading(true);
    let document = makeDocument();
    try {
      document = {...document, ...await decrypt(bytestring, password)};
    } catch (error) {
      if (error.name === "OperationError") {
        setError("Incorrect password");
        setLoading(false);
        return;
      } else { throw error; }
    }
    document.password = password;
    document.fileHandle = fileHandle;
    document.name = filename;
    const text = plainText(document.slate);
    document.initialCharacterCount = text.length;
    document.initialWordCount = countWords(text);
    const slate = document.slate;
    delete document.slate;
    setDocument(document);
    setError(null);
    setLoading(false);
    editor.children = slate;
    setTimeout(() => {
      ReactEditor.focus(editor);
      Transforms.select(editor, Editor.end(editor, []));
    }, 0);
    setTimeout(() => setShow(false), 100);
  }

  const width = "w-60";
  const buttonClass = "py-1 px-4 w-full text-sm flex items-center justify-center rounded focus:outline-none focus:shadow-outline";
  const decryptButtonClass = `${buttonClass} bg-blue-400 hover:bg-blue-500 text-white dark:bg-blue-800 dark:hover:bg-blue-700`;
  const cancelButtonClass = `${buttonClass} border-2 border-blue-400 hover:border-blue-500 text-blue-500 hover:text-blue-700 dark:border-blue-800 dark:text-blue-700 dark:hover:border-blue-700 dark:hover:text-blue-600`;

  return (
    <Modal>
      <div className="text-lg mb-4 border-b border-blue-100 py-4 px-6 text-gray-800 dark:text-slate-300 dark:border-blue-900">
        Decrypt {filename}
      </div>
      <div className="px-6 pt-2 pb-6">
        <input
          ref={ref}
          autoComplete="off"
          type="password"
          className={`${error ? "border-red-600" : "border-blue-200"} ${width} block appearance-none border rounded py-1.5 px-3 text-gray-700 mb-5 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-200`}
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-sm text-red-700 mb-5 -mt-4">{error}</div>
        )}
        <div className={`flex ${width} gap-4 justify-between`}>
          <button
            onClick={decryptClicked}
            className={`${decryptButtonClass} ${loading ? "pointer-events-none" : ""}`}
          >
            {loading ? <ClipLoader color="white" size={18} speedMultiplier={2} /> : "Decrypt"}
          </button>
          <button onClick={() => setShow(false)} className={cancelButtonClass}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

DecryptModal.propTypes = {
  filename: PropTypes.string.isRequired,
  fileHandle: PropTypes.object.isRequired,
  bytestring: PropTypes.instanceOf(ArrayBuffer).isRequired,
  setShow: PropTypes.func.isRequired,
};

export default DecryptModal;