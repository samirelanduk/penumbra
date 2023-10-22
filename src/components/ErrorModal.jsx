import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

const ErrorModal = props => {

  const { message, setShow } = props;

  return (
    <Modal setShow={setShow} className="bg-gray-50">
      <div className="h-14 bg-red-500 flex items-center px-4 text-white gap-2 text-2xl dark:bg-red-800">
        <svg viewBox="0 0 512 512" className="h-5/6">
          <ellipse cx="256" cy="256" rx="256" ry="255.832" className="fill-red-500 dark:fill-red-800" />
          <g transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 77.26 32)" className="fill-white">
            <rect x="3.98" y="-427.615" width="55.992" height="285.672"/>
            <rect x="-110.828" y="-312.815" width="285.672" height="55.992"/>
          </g>
        </svg>
        Error
      </div>

      <div className="px-6 py-10 ">{message}</div>
      <div className="border-t px-6 py-3 flex justify-end dark:border-gray-500">
        <button
          onClick={() => setShow(false)}
          className="block w-fit cursor-pointer border rounded px-2 bg-white py-1 dark:border-gray-500 dark:bg-black"
        >
          Dismiss
        </button>
      </div>
    </Modal>
  );
};

ErrorModal.propTypes = {
  message: PropTypes.string.isRequired,
  setShow: PropTypes.func.isRequired
};

export default ErrorModal;