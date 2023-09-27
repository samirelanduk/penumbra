import BottomRow from "@/components/BottomRow";
import TextEditor from "@/components/TextEditor";
import TopRow from "@/components/TopRow";
import "@/index.css";

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <TopRow />
      <TextEditor />
      <BottomRow />
    </div>
  )
}
