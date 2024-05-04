import { useContext } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { SettingsContext } from "@/contexts";

const SettingsModal = props => {

  const { setShow } = props;

  const fonts = [
    "Mulish",
    "Merriweather",
  ]

  const [settings, setSettings] = useContext(SettingsContext);

  const toggleClass = "flex h-8 items-center";
  const toggleOptionClass = "px-3 cursor-pointer h-full flex items-center justify-center transition-colors duration-200";
  const selectedToggleOptionClass = `${toggleOptionClass} bg-slate-300 rounded-full`
  const unselectedToggleOptionClass = `${toggleOptionClass} dark:text-slate-300`

  const darkModeOptions = [
    {name: "On", value: "on"},
    {name: "Off", value: "off"},
    {name: "Use System", value: "system"},
  ]

  const textSizeOptions = [
    {name: "Small", value: "small"},
    {name: "Medium", value: "medium"},
    {name: "Large", value: "large"},
  ]

  return (
    <Modal className="p-6 w-full max-w-xl">
      <div className="font-semibold text-3xl pb-3 mb-4 border-b border-slate-300">
        Settings
      </div>

      <div className="flex flex-col gap-8">


        <div>
          <label>Font</label>
          <select
            value={settings.font}
            onChange={e => setSettings("font", e.target.value)}
            className="w-full py-1.5 px-3 mt-1.5 border rounded dark:bg-slate-900"
          >
            {fonts.map((font, i) => (
              <option key={i}>{font}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Dark Mode</label>
          <div className={toggleClass}>
            {darkModeOptions.map((option, i) => (
              <div
                key={i}
                className={option.value === settings.darkMode ? selectedToggleOptionClass : unselectedToggleOptionClass}
                onClick={() => setSettings("darkMode", option.value)}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label>Text Size</label>
          <div className={toggleClass}>
            {textSizeOptions.map((option, i) => (
              <div
                key={i}
                className={option.value === settings.textSize ? selectedToggleOptionClass : unselectedToggleOptionClass}
                onClick={() => setSettings("textSize", option.value)}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex gap-1">
            <label htmlFor="showWordCount">Show Word Count</label>
            <input
              id="showWordCount"
              type="checkbox"
              checked={settings.showWordCount}
              onChange={() => setSettings("showWordCount", !settings.showWordCount)}
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="showCharacterCount">Show Character Count</label>
            <input
              id="showCharacterCount"
              type="checkbox"
              checked={settings.showCharacterCount}
              onChange={() => setSettings("showCharacterCount", !settings.showCharacterCount)}
            />
          </div>
        </div>


      </div>
      <div onClick={() => setShow(false)} className="ml-auto w-fit cursor-pointer">Done</div>
    </Modal>
  );
};

SettingsModal.propTypes = {
  setShow: PropTypes.func.isRequired,
};

export default SettingsModal;