import { useContext } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { SettingsContext } from "@/contexts";
import SegmentedControl from "./SegmentedControls";

const SettingsModal = props => {

  const { setShow, document, setDocument } = props;

  const [settings, setSettings] = useContext(SettingsContext);

  const darkModeOptions = [
    {label: "On", value: "on"},
    {label: "Off", value: "off"},
    {label: "Use System", value: "system"},
  ]

  const fonts = [
    "Inter",
    "Kanit",
    "Merriweather",
    "Mulish",
    "Playfair Display",
    "Roboto Slab",
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

  const labelClass = "text-xs block mb-1 font-bold dark:text-slate-300";

  return (
    <Modal className="p-6 w-full max-w-xl">
      <div className="font-semibold text-3xl pb-3 mb-4 border-b border-slate-300">
        Settings
      </div>

      <div className="flex flex-col gap-8">


        <div>
          <label className={labelClass}>Dark Mode</label>
          <SegmentedControl
            options={darkModeOptions} 
            value={settings.darkMode}
            setValue={value => setSettings("darkMode", value)}
          />
        </div>


        <div>
          <label className={labelClass}>Font</label>
          <select
            value={settings.font}
            onChange={e => setSettings("font", e.target.value)}
            className="w-full py-1.5 px-3 border rounded dark:bg-slate-900"
          >
            {fonts.map((font, i) => (
              <option key={i}>{font}</option>
            ))}
          </select>
        </div>

        
        <div>
          <label className={labelClass}>Text Size</label>
          <SegmentedControl
            options={textSizeOptions} 
            value={settings.textSize}
            setValue={value => setSettings("textSize", value)}
          />
        </div>


        <div className="flex gap-8">
          <div>
            <label
              className={`${labelClass} cursor-pointer`}
              onClick={() => setSettings("showWordCount", !settings.showWordCount)}
            >
              Word Count
            </label>
            <SegmentedControl
              options={wordCountOptions} 
              value={settings.showWordCount}
              setValue={value => setSettings("showWordCount", value)}
            />
          </div>
          <div>
            <label
              className={`${labelClass} cursor-pointer`}
              onClick={() => setSettings("showCharacterCount", !settings.showCharacterCount)}
            >
              Character Count
            </label>
            <SegmentedControl
              options={characterCountOptions} 
              value={settings.showCharacterCount}
              setValue={value => setSettings("showCharacterCount", value)}
            />
          </div>
        </div>


        <div>
          <label className={labelClass}>Font</label>
          <input
            type="checkbox"
            checked={document.settings.font !== null}
            onChange={() => setDocument({...document, settings: {...document.settings, font: document.settings.font === null ? settings.font : null}})}
          />
          <select
            value={document.settings.font || settings.font}
            onChange={e => setDocument({...document, settings: {...document.settings, font: e.target.value}})}
            className="w-full py-1.5 px-3 border rounded dark:bg-slate-900"
          >
            {fonts.map((font, i) => (
              <option key={i}>{font}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Text Size</label>
          <input
            type="checkbox"
            checked={document.settings.textSize !== null}
            onChange={() => setDocument({...document, settings: {...document.settings, textSize: document.settings.textSize === null ? settings.textSize : null}})}
          />
          <SegmentedControl
            options={textSizeOptions} 
            disabled={document.settings.textSize === null}
            value={document.settings.textSize || settings.textSize}
            setValue={value => setDocument({...document, settings: {...document.settings, textSize: value}})}
          />
        </div>

        <div className="flex gap-8">
          <div>
            <label
              className={`${labelClass} cursor-pointer`}
              onClick={() => setSettings("showWordCount", !settings.showWordCount)}
            >
              Word Count
            </label>
            <input
              type="checkbox"
              checked={document.settings.showWordCount !== null}
              onChange={() => setDocument({...document, settings: {...document.settings, showWordCount: document.settings.showWordCount === null ? settings.showWordCount : null}})}
            />
            <SegmentedControl
              options={wordCountOptions} 
              disabled={document.settings.showWordCount === null}
              value={document.settings.showWordCount === null ? settings.showWordCount : document.settings.showWordCount}
              setValue={value => setDocument({...document, settings: {...document.settings, showWordCount: value}})}
            />
          </div>
          <div>
            <label
              className={`${labelClass} cursor-pointer`}
              onClick={() => setSettings("showCharacterCount", !settings.showCharacterCount)}
            >
              Character Count
            </label>
            <input
              type="checkbox"
              checked={document.settings.showCharacterCount !== null}
              onChange={() => setDocument({...document, settings: {...document.settings, showCharacterCount: document.settings.showCharacterCount === null ? settings.showCharacterCount : null}})}
            />
            <SegmentedControl
              options={characterCountOptions} 
              disabled={document.settings.showCharacterCount === null}
              value={document.settings.showCharacterCount === null ? settings.showCharacterCount : document.settings.showCharacterCount}
              setValue={value => setDocument({...document, settings: {...document.settings, showCharacterCount: value}})}
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
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired,
};

export default SettingsModal;