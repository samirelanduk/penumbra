import React from "react";
import { useSlate } from "slate-react";

const Toolbar = () => {

  const editor = useSlate();

  const buttonClass = "w-10 h-10 flex items-center justify-center rounded-md cursor-pointer text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-900"

  return (
    <div className="flex mx-auto">
      <div className={`${buttonClass}`}>
        P
      </div>
      <div className={`${buttonClass}`}>
        H1
      </div>
      <div className={`${buttonClass}`}>
        H2
      </div>
      <div className={`${buttonClass}`}>
        H3
      </div>
      <div className={`${buttonClass} font-bold ml-5`}>
        B
      </div>
      <div className={`${buttonClass} italic`}>
        I
      </div>
      <div className={`${buttonClass} underline`}>
        U
      </div>
      <div className={`${buttonClass} line-through`}>
        S
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  
};

export default Toolbar;