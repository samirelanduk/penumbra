import BottomRow from "@/components/BottomRow";
import TextEditor from "@/components/TextEditor";
import TopRow from "@/components/TopRow";
import "@/index.css";
import Head from "next/head";

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <TopRow />
      <TextEditor />
      <BottomRow />
    </div>
  )
}
