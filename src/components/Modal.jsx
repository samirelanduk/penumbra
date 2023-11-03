import { PreviewContext } from "@/contexts";
import { useContext } from "react";

const Modal = props => {

  const { children } = props;

  const preview = useContext(PreviewContext);

  return (
    <div className={`fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-700 bg-opacity-80 flex justify-center ${preview ? "items-start pt-24" : "items-center"}`}>
      <div className={`bg-gray-200 w-fit border rounded-md overflow-hidden border-slate-500 dark:bg-slate-900 dark:border-slate-500 ${props.className || ""}`}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  
};

export default Modal;