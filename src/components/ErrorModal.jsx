import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

const ErrorModal = props => {

  const { message, setShow } = props;

  return (
    <Modal setShow={setShow} className="flex flex-col py-10 px-8 gap-9 text-slate-500 text-color">
      <div className="flex items-center gap-4 text-lg">
        <svg width="33" height="30" viewBox="0 0 33 30" className="fill-slate-500 dark:fill-white">
          <path d="M31.8481 23.4434L19.892 2.67989C19.5457 2.08764 19.0504 1.59638 18.4553 1.25499C17.8602 0.913595 17.1861 0.733963 16.5 0.733963C15.8139 0.733963 15.1398 0.913595 14.5447 1.25499C13.9496 1.59638 13.4543 2.08764 13.108 2.67989L1.15196 23.4434C0.815929 24.0181 0.638832 24.6719 0.638832 25.3376C0.638832 26.0034 0.815929 26.6571 1.15196 27.2318C1.49442 27.827 1.98907 28.3204 2.58515 28.6613C3.18124 29.0023 3.85729 29.1785 4.54395 29.1719H28.4561C29.1423 29.178 29.8177 29.0016 30.4133 28.6607C31.0089 28.3197 31.5031 27.8266 31.8453 27.2318C32.1818 26.6574 32.3593 26.0037 32.3598 25.338C32.3603 24.6722 32.1837 24.0183 31.8481 23.4434ZM29.0043 25.5899C28.9487 25.6846 28.8685 25.7626 28.7723 25.8155C28.676 25.8685 28.5672 25.8944 28.4574 25.8906H4.54395C4.43415 25.8944 4.32537 25.8685 4.22911 25.8155C4.13285 25.7626 4.05268 25.6846 3.99707 25.5899C3.94991 25.5132 3.92494 25.4249 3.92494 25.3349C3.92494 25.2448 3.94991 25.1566 3.99707 25.0799L15.9531 4.31641C16.0123 4.22528 16.0934 4.15039 16.1889 4.09855C16.2844 4.0467 16.3913 4.01955 16.5 4.01955C16.6087 4.01955 16.7156 4.0467 16.8111 4.09855C16.9066 4.15039 16.9877 4.22528 17.0469 4.31641L29.0016 25.0799C29.0491 25.1563 29.0746 25.2445 29.0751 25.3345C29.0756 25.4245 29.0511 25.5129 29.0043 25.5899ZM14.8594 16.5938V12.2188C14.8594 11.7836 15.0322 11.3663 15.3399 11.0587C15.6476 10.751 16.0649 10.5781 16.5 10.5781C16.9351 10.5781 17.3524 10.751 17.6601 11.0587C17.9678 11.3663 18.1406 11.7836 18.1406 12.2188V16.5938C18.1406 17.0289 17.9678 17.4462 17.6601 17.7539C17.3524 18.0615 16.9351 18.2344 16.5 18.2344C16.0649 18.2344 15.6476 18.0615 15.3399 17.7539C15.0322 17.4462 14.8594 17.0289 14.8594 16.5938ZM18.6875 22.0625C18.6875 22.4952 18.5592 22.9181 18.3188 23.2778C18.0785 23.6376 17.7368 23.9179 17.3371 24.0835C16.9374 24.2491 16.4976 24.2924 16.0732 24.208C15.6489 24.1236 15.2591 23.9152 14.9532 23.6093C14.6473 23.3034 14.4389 22.9136 14.3545 22.4893C14.2701 22.0649 14.3135 21.6251 14.479 21.2254C14.6446 20.8257 14.925 20.484 15.2847 20.2437C15.6444 20.0033 16.0674 19.875 16.5 19.875C17.0802 19.875 17.6366 20.1055 18.0468 20.5157C18.457 20.9259 18.6875 21.4823 18.6875 22.0625Z" />
        </svg>
        <div>{message}</div>
      </div>
      <button
        onClick={() => setShow(false)}
        className="w-fit border-2 rounded px-8 py-1 mx-auto border-slate-500 hover:bg-slate-500 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-slate-800"
      >
        Dismiss
      </button>
    </Modal>
  )
}

ErrorModal.propTypes = {
  message: PropTypes.string.isRequired,
  setShow: PropTypes.func.isRequired
};

export default ErrorModal;