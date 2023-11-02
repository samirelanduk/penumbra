import { useState } from "react";
import BottomRow from "@/components/BottomRow";
import TextEditor from "@/components/TextEditor";
import TopRow from "@/components/TopRow";
import { makeDocument } from "@/utils";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { withPenumbraCommands } from "@/commands";
import { useWarnUnsavedChanges, useDocumentTitle } from "@/hooks";
import Div100vh from "react-div-100vh";

export default function Home() {

  const [document, setDocument] = useState(makeDocument());
  const [editor] = useState(() => withReact(withPenumbraCommands(withHistory(createEditor()))));

  useWarnUnsavedChanges(document);
  useDocumentTitle(document);

  const onChange = value => {
    setDocument({ ...document, slate: value });
  }

  return (
    <Slate editor={editor} initialValue={document.slate} onChange={onChange}>
      <Div100vh className="flex flex-col font-sans bg-[#FAF9F6] dark:bg-slate-800 dark:text-slate-200">
        <TopRow document={document} setDocument={setDocument} />
        <TextEditor />
        <BottomRow document={document} />
      </Div100vh>
    </Slate>
  )
}
