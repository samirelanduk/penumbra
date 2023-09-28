import { useState } from "react";
import "@/index.css";
import Head from "next/head";
import BottomRow from "@/components/BottomRow";
import TextEditor from "@/components/TextEditor";
import TopRow from "@/components/TopRow";
import { Mulish } from "next/font/google";
 
const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
})

export default function App() {

  const [text, setText] = useState("");

  return (
    <div className={`${mulish.variable}`}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="h-screen flex flex-col font-sans">
        <TopRow />
        <TextEditor text={text} setText={setText} />
        <BottomRow text={text} />
      </div>
    </div>
  )
}
