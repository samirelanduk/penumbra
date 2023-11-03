import { useCallback, useContext } from "react";
import { Editable } from "slate-react";
import { PreviewContext } from "@/contexts";

const TextEditor = () => {

  const preview = useContext(PreviewContext);

  const H1Element = props => {
    return <h1 {...props.attributes} className="text-color">{props.children}</h1>
  }

  const H2Element = props => {
    return <h2 {...props.attributes} className="text-color">{props.children}</h2>
  }

  const H3Element = props => {
    return <h3 {...props.attributes} className="text-color">{props.children}</h3>
  }

  const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
  }

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "h1": return <H1Element {...props} />
      case "h2": return <H2Element {...props} />
      case "h3": return <H3Element {...props} />
      default: return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    const boldClass = props.leaf.bold ? "font-bold" : "";
    const italicsClass = props.leaf.italics ? "italic" : "";
    const underlineClass = props.leaf.underline ? "underline" : "";
    const strikethroughClass = props.leaf.strikethrough ? "line-through" : "";
    const className = `${boldClass} ${italicsClass} ${underlineClass} ${strikethroughClass}`;
    return (
      <span
        {...props.attributes}
        className={className}
      >
        {props.children}
      </span>
    )
  }, [])

  const proseClass = "prose prose-h1:mb-0 prose-h2:mb-4 prose-h2:mt-8 prose-h3:mt-4 prose-p:my-4 prose-p:my-5";
  const previewClass = preview ? "px-4 py-4" : "px-4 py-4 md:px-[calc((100vw-738px)/2)] md:py-6 lg:px-[calc((100vw-800px)/2)] lg:py-8 lg:prose-xl lg:prose-h1:mb-8 lg:prose-h2:mb-6"
  
  return (
    <Editable
      autoFocus={!preview}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      className={`flex-grow overflow-y-auto w-full block outline-none bg-inherit resize-none max-w-none dark:text-inherit ${previewClass} ${proseClass}`}
    />
  );
};

TextEditor.propTypes = {

};

export default TextEditor;