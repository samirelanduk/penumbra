import { useState } from "react";
import PropTypes from "prop-types";
import DownIcon from "@/images/down.svg";

const Select = props => {

  const { options, value, setValue, disabled } = props;

  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const optionClicked = option => {
    setValue(option.value);
    setIsOpen(false);
  }

  const optionClass = "h-9 cursor-pointer flex items-center px-4 bg-white";

  return (
    <div className={`relative ${disabled ? "opacity-40 pointer-events-none" : ""} ${props.className || ""}`}>
      <div
        className={`${optionClass} bg-white group flex border-slate-300 dark:border-slate-400 dark:bg-slate-800 ${isOpen ? "rounded-t border-t border-l border-r pb-px" : "rounded border"} ${selectedOption?.className || ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-grow">{selectedOption?.label}</div>
        <DownIcon className="w-3 h-auto fill-slate-500 group-hover:fill-slate-800 dark:fill-slate-400 dark:group-hover:fill-slate-300" />
      </div>
      {isOpen && (
        <div className="absolute z-30 rounded-b overflow-hidden w-full top-9 -mt-px border border-slate-300 dark:border-slate-400">
          {options.map((option, i) => (
            <div
              key={i}
              onClick={() => optionClicked(option)}
              className={`${optionClass} hover:bg-slate-400 hover:text-white dark:hover:bg-slate-500 ${option.value === value ? "bg-slate-200 dark:bg-slate-700" : "bg-white dark:bg-slate-800"} ${option.className || ""}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Select;