import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { decrypt } from "@/encryption";

const DecryptModal = props => {

  const { filename, bytestring, setShow, setDocument } = props;

  const [password, setPassword] = useState("");

  const decryptClicked = async () => {
    const document = await decrypt(bytestring, password);
    document.password = password;
    setDocument(document);
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
      <button onClick={decryptClicked}>Decrypt</button>
    </Modal>
  );
};

DecryptModal.propTypes = {
  filename: PropTypes.string.isRequired,
  bytestring: PropTypes.instanceOf(Uint8Array).isRequired,
  setShow: PropTypes.func.isRequired,
};

export default DecryptModal;