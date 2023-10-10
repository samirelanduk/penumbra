import { useState } from "react";
import BottomRow from "@/components/BottomRow";
import TextEditor from "@/components/TextEditor";
import TopRow from "@/components/TopRow";

export default function Home() {

  const [document, setDocument] = useState(null);

  return (
    <div className="h-screen flex flex-col font-sans bg-[#FAF9F6] dark:bg-slate-800 dark:text-slate-200">
      <TopRow document={document} setDocument={setDocument} />
      <TextEditor document={document} setDocument={setDocument} />
      <BottomRow document={document} />
    </div>
  )
}
