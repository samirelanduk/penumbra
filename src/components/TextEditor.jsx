import { useState } from "react";

const TextEditor = () => {

  const [text, setText] = useState("");

  return (
    <div className="flex-grow">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full h-full outline-none p-4"
      />
    </div>
  );
};

TextEditor.propTypes = {
  
};

export default TextEditor;