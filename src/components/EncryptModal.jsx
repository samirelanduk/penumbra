import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { encrypt } from "@/encryption";
import { saveFileAs } from "@/files";
import { countWords } from "@/utils";
import { ClipLoader } from "react-spinners";
import { plainText } from "@/serialize";
import { useSlate } from "slate-react";

const EncryptModal = props => {

  const { setShow, document, setDocument } = props;

  const editor = useSlate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const canEncrypt = Boolean(password) && password === confirmPassword;

  const encryptClicked = async () => {
    setLoading(true);
    const bytestring = await encrypt({document, slate: editor.children}, password);
    const fileHandle = await saveFileAs(bytestring);
    if (!fileHandle) {
      setLoading(false);
      return;
    }
    const text = plainText(editor.children);
    setDocument({
      ...document,
      name: fileHandle.name,
      fileHandle,
      password,
      initialCharacterCount: text.length,
      initialWordCount: countWords(text),
    });
    setLoading(false);
    setTimeout(() => setShow(false), 100);
  }

  const width = "w-60";
  const labelClass = "text-sm mb-1";
  const inputClass = `${width} block appearance-none border rounded py-1.5 px-3 text-gray-700 mb-5 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-200`;
  const buttonClass = "py-1 px-4 w-full text-sm flex items-center justify-center rounded focus:outline-none focus:shadow-outline";
  const encryptButtonClass = `${buttonClass} bg-orange-400 hover:bg-orange-500 text-white dark:bg-orange-800 dark:hover:bg-orange-700`;
  const cancelButtonClass = `${buttonClass} border-2 border-orange-400 hover:border-orange-500 text-orange-500 hover:text-orange-700 dark:border-orange-800 dark:text-orange-700 dark:hover:border-orange-700 dark:hover:text-orange-600`;

  return (
    <Modal setShow={setShow}>
      <div className="text-lg mb-4 border-b border-orange-100 py-4 px-6 text-gray-800 dark:text-slate-300 dark:border-orange-900">
        Encrypting as new file
      </div>
      <div className="px-6 pt-2 pb-6">
        <div className="flex flex-col">
          <label htmlFor="password" className={labelClass}>Password</label>
          <input
            id="password"
            type="password"
            className={inputClass}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className={inputClass}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={`flex ${width} gap-4 justify-between`}>
          <button
            onClick={encryptClicked}
            className={`${encryptButtonClass} ${canEncrypt && !loading ? "" : "opacity-50 pointer-events-none"}`}
            disabled={!canEncrypt}
          >
            {loading ? <ClipLoader color="white" size={18} speedMultiplier={2} /> : "Encrypt"}
          </button>
          <button onClick={() => setShow(false)} className={cancelButtonClass}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

EncryptModal.propTypes = {
  setShow: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  setDocument: PropTypes.func.isRequired,
};

export default EncryptModal;