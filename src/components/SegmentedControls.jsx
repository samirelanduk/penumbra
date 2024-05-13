import { useRef } from "react";
import PropTypes from "prop-types";

const SegmentedControl = props => {

  const { options, value, setValue, disabled } = props;

  const valueIndex = options.findIndex(option => option.value === value);
  const ref = useRef();
  const valueWidth = ref.current?.children[valueIndex + 1]?.offsetWidth;
  const valueLeft = ref.current?.children[valueIndex + 1]?.offsetLeft;

  return (
    <div ref={ref} className={`relative bg-gray-300 w-fit h-7 flex rounded-lg px-0.5 text-xs font-bold ${disabled ? "opacity-40 pointer-events-none" : ""}`}>
      <div
        className="bg-white absolute top-0.5 bottom-0.5 z-10 rounded-md transition-all duration-200 ease-in-out shadow dark:bg-slate-900"
        style={{width: valueWidth, left: valueLeft}}
      />
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => setValue(option.value)}
          className={`relative z-20 px-2.5 ${disabled ? "cursor-auto" : "cusor-pointer"} ${option.value === value ? "dark:text-white" : "dark:text-slate-800"}`}
        >
          {option.label}
        </button>
      
      ))}
    </div>
  );
};

SegmentedControl.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default SegmentedControl;