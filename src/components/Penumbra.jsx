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
import { useWarnUnsavedChanges, useDocumentTitle } from "@/hooks";
import { PreviewContext } from "@/contexts";

const Penumbra = props => {
  
  const { preview } = props;
  
  const [document, setDocument] = useState(makeDocument());
  const [editor] = useState(() => withReact(withPenumbraCommands(withHistory(createEditor()))));

  useWarnUnsavedChanges(document);
  useDocumentTitle(document);

  const onChange = value => {
    setDocument({ ...document, slate: value });
  }

  return (
    <PreviewContext.Provider value={preview}>
      <Slate editor={editor} initialValue={document.slate} onChange={onChange}>
        <div className={`flex h-full flex-col font-sans bg-[#FAF9F6] dark:bg-slate-800 dark:text-slate-200 ${preview ? "pt-2" : ""}`}>
          <TopRow document={document} setDocument={setDocument} />
          <TextEditor />
          <BottomRow document={document} />
        </div>
      </Slate>
    </PreviewContext.Provider>
  );
};

Penumbra.propTypes = {
  preview: PropTypes.bool,
};

export default Penumbra;