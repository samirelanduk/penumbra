import { useState } from "react";
import "@/index.css";
import Head from "next/head";
import BottomRow from "@/components/BottomRow";
import TextEditor from "@/components/TextEditor";
import TopRow from "@/components/TopRow";

export default function App() {

  const [text, setText] = useState("");

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <TopRow />
      <TextEditor text={text} setText={setText} />
      <BottomRow text={text} />
    </div>
  )
}
