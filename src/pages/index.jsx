import { useState } from "react";
import BottomRow from "@/components/BottomRow";
import TextEditor from "@/components/TextEditor";
import TopRow from "@/components/TopRow";
import { makeDocument } from "@/utils";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import Toolbar from "@/components/Toolbar";
import { withPenumbraCommands } from "@/commands";
import { useWarnUnsavedChanges, useDocumentTitle } from "@/hooks";

export default function Home() {

  const [document, setDocument] = useState(makeDocument());
  const [editor] = useState(() => withReact(withPenumbraCommands(createEditor())));

  useWarnUnsavedChanges(document);
  useDocumentTitle(document);

  const onChange = value => {
    setDocument({ ...document, slate: value });
  }

  return (
    <Slate editor={editor} initialValue={document.slate} onChange={onChange}>
      <div className="h-screen flex flex-col font-sans bg-[#FAF9F6] dark:bg-slate-800 dark:text-slate-200">
        <TopRow document={document} setDocument={setDocument} />
        <TextEditor document={document} setDocument={setDocument} />
        <BottomRow document={document} />
      </div>
    </Slate>
  )
}
