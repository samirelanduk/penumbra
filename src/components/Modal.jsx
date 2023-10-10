import PropTypes from "prop-types";

const Modal = props => {

  const { children } = props;

  return (
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white w-fit rounded-md p-4 text-slate-500">
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  
};

export default Modal;