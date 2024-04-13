import { useContext } from "react";
import PropTypes from "prop-types";
import { useSlate } from "slate-react";
import { PreviewContext } from "@/contexts";

const ToolbarButton = props => {

  const { isActive, toggle, Icon, className } = props;

  const editor = useSlate();

  const buttonIsActive = isActive(editor);
  const isPreview = useContext(PreviewContext);

  const buttonClass = `w-6 h-6 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-900 ${isPreview ? "" : "sm:h-8 sm:w-8"}`;
  const selectedButtonClass = `${buttonClass} bg-gray-200 dark:bg-slate-900`;
  const iconClass = "w-full h-auto fill-gray-600 dark:fill-gray-400";

  const baseClass = buttonIsActive ? selectedButtonClass : buttonClass;

  const onMouseDown = e => {
    e.preventDefault();
    toggle(editor);
  }

  return (
    <div className={`${baseClass} ${className}`} onMouseDown={onMouseDown}>
      <Icon className={iconClass} />
    </div>
  );
};

ToolbarButton.propTypes = {
  isActive: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  Icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,
};

export default ToolbarButton;