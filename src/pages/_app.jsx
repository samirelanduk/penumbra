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

  const title = "Penumbra - encrypted local notes";
  const description = "Penumbra is a simple, secure, and private note-taking app. It runs entirely in your browser, and your notes are never sent to a server. You can even use it offline.";

  return (
    <div className={`${mulish.variable}`}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta content="@samirelanduk" name="twitter:site"/>
        <meta content={title} name="twitter:title"/>
        <meta content={description} name="twitter:description"/>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className="h-screen flex flex-col font-sans bg-[#FAF9F6] dark:bg-slate-800 dark:text-slate-200">
        <TopRow />
        <TextEditor text={text} setText={setText} />
        <BottomRow text={text} />
      </div>
    </div>
  )
}
