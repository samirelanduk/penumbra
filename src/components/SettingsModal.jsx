import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

const SettingsModal = props => {

  const { setShow } = props;

  return (
    <Modal className="p-6 w-full max-w-xl">
      <div className="font-semibold text-3xl pb-3 mb-4 border-b border-slate-300">
        Settings
      </div>
      <div onClick={() => setShow(false)} className="ml-auto w-fit cursor-pointer">Done</div>
    </Modal>
  );
};

SettingsModal.propTypes = {
  setShow: PropTypes.func.isRequired,
};

export default SettingsModal;