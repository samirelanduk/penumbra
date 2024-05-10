import { useState } from "react";
import PropTypes from "prop-types";
import BottomRow from "@/components/BottomRow";
import TextEditor from "@/components/TextEditor";
import TopRow from "@/components/TopRow";
import { makeDocument } from "@/utils";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { withPenumbraCommands } from "@/commands";
import { useWarnUnsavedChanges, useDocumentTitle, useSettings, useDarkMode } from "@/hooks";
import { PreviewContext, SettingsContext } from "@/contexts";

const Penumbra = props => {
  
  const { preview } = props;
  
  const [document, setDocument] = useState(makeDocument());
  const [editor] = useState(() => withReact(withPenumbraCommands(withHistory(createEditor()))));
  const [settings, setSettings] = useSettings();

  useWarnUnsavedChanges(document);
  useDocumentTitle(document);

  const onChange = value => {
    setDocument({ ...document, slate: value });
  };

  const darkModeClass = useDarkMode(settings) ? "dark" : "";

  return (
    <PreviewContext.Provider value={preview}>
      <SettingsContext.Provider value={[settings, setSettings]}>
        <Slate editor={editor} initialValue={document.slate} onChange={onChange}>
          <div className={`h-full ${darkModeClass}`}>
            <div className={`flex h-full flex-col font-sans bg-[#FAF9F6] dark:bg-slate-800 dark:text-slate-200 ${preview ? "pt-2" : ""}`}>
              <TopRow document={document} setDocument={setDocument} />
              <TextEditor document={document} />
              <BottomRow document={document} />
            </div>
          </div>
        </Slate>
      </SettingsContext.Provider>
    </PreviewContext.Provider>
  );
};

Penumbra.propTypes = {
  preview: PropTypes.bool,
};

export default Penumbra;