import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { decrypt } from "@/encryption";

const DecryptModal = props => {

  const { filename, bytestring, setShow, fileHandle, setDocument } = props;

  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const decryptClicked = async () => {
    let document;
    try {
      document = await decrypt(bytestring, password);
    } catch (error) {
      if (error.name === "OperationError") {
        setError("Incorrect password");
        return;
      } else { throw error; }
    }
    document.password = password;
    document.fileHandle = fileHandle;
    setDocument(document);
    setError(null);
    setShow(false);
  }

  return (
    <Modal>
      <div>Enter the password to open {filename}:</div>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <div>{error}</div>}
      <button onClick={decryptClicked}>Decrypt</button>
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