import PropTypes from "prop-types";

const Modal = props => {

  const { children } = props;

  return (
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-700 bg-opacity-80 flex justify-center items-center">
      <div className={`bg-gray-200 w-fit border rounded-md overflow-hidden border-slate-500 dark:bg-slate-900 dark:border-slate-500 ${props.className || ""}`}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  
};

export default Modal;