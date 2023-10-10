import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { encrypt } from "@/encryption";
import { saveFileAs } from "@/files";
import { countWords } from "@/utils";

const EncryptModal = props => {

  const { setShow, document, setDocument, setCurrentFileHandle } = props;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const canEncrypt = Boolean(password) && password === confirmPassword;

  const encryptClicked = async () => {
    const bytestring = await encrypt(document, password);
    const fileHandle = await saveFileAs(bytestring);
    if (!fileHandle) return;
    setDocument({
      ...document,
      name: fileHandle.name,
      initialCharacterCount: document.text.length,
      initialWordCount: countWords(document.text),
    });
    setCurrentFileHandle(fileHandle);
    setShow(false);
  }

  return (
    <Modal setShow={setShow}>
      <div>Encrypting</div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        className="rounded-md bg-slate-500 text-white px-4 py-2"
        disabled={!canEncrypt}
        onClick={encryptClicked}
      >
        Encrypt
      </button>
      <button onClick={() => setShow(false)}>
        Cancel
      </button>
    </Modal>
  );
};

EncryptModal.propTypes = {
  setShow: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  setDocument: PropTypes.func.isRequired,
  setCurrentFileHandle: PropTypes.func.isRequired,
};

export default EncryptModal;