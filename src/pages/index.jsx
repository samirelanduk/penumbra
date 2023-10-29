import { useState, useEffect } from "react";
import BottomRow from "@/components/BottomRow";
import TextEditor from "@/components/TextEditor";
import TopRow from "@/components/TopRow";
import { makeDocument } from "@/utils";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import Toolbar from "@/components/Toolbar";

export default function Home() {

  const [document, setDocument] = useState(makeDocument());
  const [editor] = useState(() => withReact(createEditor()));

  useEffect(() => {
    const onUnload = e => {
      e.preventDefault();
      if (!document) return;
      if (document.name) {
        if (document.text.length === document.initialCharacterCount) return;
      } else {
        if (!document.text) return;
      }
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [document]);

  const onChange = value => {
    setDocument({ ...document, slate: value });
  }

  return (
    <Slate editor={editor} initialValue={document.slate} onChange={onChange}>
      <div className="h-screen flex flex-col font-sans bg-[#FAF9F6] dark:bg-slate-800 dark:text-slate-200">
        <TopRow document={document} setDocument={setDocument} />
        <Toolbar />
        <TextEditor document={document} setDocument={setDocument} />
        <BottomRow document={document} />
      </div>
    </Slate>
  )
}
