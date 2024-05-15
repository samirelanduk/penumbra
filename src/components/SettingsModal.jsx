import { useContext } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { SettingsContext } from "@/contexts";
import SegmentedControl from "./SegmentedControls";
import Select from "./Select";
import { inter, kanit, merriweather, mulish, playfairDisplay, robotoSlab } from "@/fonts";


const SettingsModal = props => {

  const { setShow, document, setDocument } = props;

  const [settings, setSettings] = useContext(SettingsContext);

  const darkModeOptions = [
    {label: "On", value: "on"},
    {label: "Off", value: "off"},
    {label: "Use System", value: "system"},
  ]

  const fontOptions = [
    {label: "Inter", value: "Inter", className: `${inter.variable} font-inter`},
    {label: "Kanit", value: "Kanit", className: `${kanit.variable} font-kanit`},
    {label: "Merriweather", value: "Merriweather", className: `${merriweather.variable} font-merriweather`},
    {label: "Mulish", value: "Mulish", className: `${mulish.variable} font-mulish`},
    {label: "Playfair Display", value: "Playfair Display", className: `${playfairDisplay.variable} font-playfairdisplay`},
    {label: "Roboto Slab", value: "Roboto Slab", className: `${robotoSlab.variable} font-robotoslab`},
  ]

  const textSizeOptions = [
    {label: "Small", value: "small"},
    {label: "Medium", value: "medium"},
    {label: "Large", value: "large"},
  ]

  const wordCountOptions = [
    {label: "Show", value: true},
    {label: "Hide", value: false},
  ]

  const characterCountOptions = [
    {label: "Show", value: true},
    {label: "Hide", value: false},
  ]

  const blockClass = "flex flex-col gap-1";
  const labelClass = "text-xs block font-bold dark:text-slate-300";
  const labelRowClass = "flex items-center gap-1";
  const countRowClass = "flex flex-col gap-4 sm:flex-row";

  return (
    <Modal className="p-6 w-full max-w-xl">
      <div className="font-semibold text-3xl pb-3 mb-6 border-b border-slate-300">
        Settings
      </div>

      <div className="flex flex-col gap-8">
        <div className={blockClass}>
          <label className={labelClass}>Dark Mode</label>
          <SegmentedControl
            options={darkModeOptions} 
            value={settings.darkMode}
            setValue={value => setSettings("darkMode", value)}
          />
        </div>

        <div className="flex flex-wrap justify-between gap-x-2 gap-y-8 sm:gap-x-10 sm:grid sm:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className={blockClass}>
              <label className={labelClass}>Font</label>
              <Select
                className="w-48"
                value={settings.font}
                setValue={value => setSettings("font", value)}
                options={fontOptions}
              />
            </div>
            <div className={blockClass}>
              <label className={labelClass}>Text Size</label>
              <SegmentedControl
                options={textSizeOptions} 
                value={settings.textSize}
                setValue={value => setSettings("textSize", value)}
              />
            </div>
            <div className={countRowClass}>
              <div className={blockClass}>
                <label className={labelClass}>Word Count</label>
                <SegmentedControl
                  options={wordCountOptions} 
                  value={settings.showWordCount}
                  setValue={value => setSettings("showWordCount", value)}
                />
              </div>
              <div className={blockClass}>
                <label className={labelClass}>Character Count</label>
                <SegmentedControl
                  options={characterCountOptions} 
                  value={settings.showCharacterCount}
                  setValue={value => setSettings("showCharacterCount", value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className={blockClass}>
              <div className={labelRowClass}>
                <input
                  type="checkbox"
                  checked={document.settings.font !== null}
                  onChange={() => setDocument({...document, settings: {...document.settings, font: document.settings.font === null ? settings.font : null}})}
                />
                <label className={labelClass}>Font</label>
              </div>
              <Select
                className="w-48"
                value={document.settings.font || settings.font}
                setValue={value => setDocument({...document, settings: {...document.settings, font: value}})}
                options={fontOptions}
                disabled={document.settings.font === null}
              />
            </div>
            <div className={blockClass}>
              <div className={labelRowClass}>
                <input
                  type="checkbox"
                  checked={document.settings.textSize !== null}
                  onChange={() => setDocument({...document, settings: {...document.settings, textSize: document.settings.textSize === null ? settings.textSize : null}})}
                />
                <label className={labelClass}>Text Size</label>
              </div>
              <SegmentedControl
                options={textSizeOptions} 
                disabled={document.settings.textSize === null}
                value={document.settings.textSize || settings.textSize}
                setValue={value => setDocument({...document, settings: {...document.settings, textSize: value}})}
              />
            </div>
            <div className={countRowClass}>
              <div className={blockClass}>
                <div className={labelRowClass}>
                  <input
                    type="checkbox"
                    checked={document.settings.showWordCount !== null}
                    onChange={() => setDocument({...document, settings: {...document.settings, showWordCount: document.settings.showWordCount === null ? settings.showWordCount : null}})}
                  />
                  <label className={labelClass}>Word Count</label>
                </div>
                <SegmentedControl
                  options={wordCountOptions} 
                  disabled={document.settings.showWordCount === null}
                  value={document.settings.showWordCount === null ? settings.showWordCount : document.settings.showWordCount}
                  setValue={value => setDocument({...document, settings: {...document.settings, showWordCount: value}})}
                />
              </div>
              <div className={blockClass}>
                <div className={labelRowClass}>
                  <input
                    type="checkbox"
                    checked={document.settings.showCharacterCount !== null}
                    onChange={() => setDocument({...document, settings: {...document.settings, showCharacterCount: document.settings.showCharacterCount === null ? settings.showCharacterCount : null}})}
                  />
                  <label className={labelClass}>Character Count</label>
                </div>
                <SegmentedControl
                  options={characterCountOptions} 
                  disabled={document.settings.showCharacterCount === null}
                  value={document.settings.showCharacterCount === null ? settings.showCharacterCount : document.settings.showCharacterCount}
                  setValue={value => setDocument({...document, settings: {...document.settings, showCharacterCount: value}})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setShow(false)}
        className="py-1 px-4 text-sm mt-10 flex items-center cursor-pointer justify-center rounded ml-auto w-fit bg-blue-400 hover:bg-blue-500 text-white dark:bg-blue-800 dark:hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Done
      </button>
    </Modal>
  );
};

SettingsModal.propTypes = {
  setShow: PropTypes.func.isRequired,
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired,
};

export default SettingsModal;