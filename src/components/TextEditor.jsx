import { useCallback } from "react";
import { Editable } from "slate-react";

const TextEditor = () => {

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

  const proseClass = "prose prose-h1:mb-0 prose-h2:mb-4 prose-h2:mt-8 prose-h3:mt-4 prose-p:my-4 lg:prose-xl lg:prose-h1:mb-8 lg:prose-h2:mb-6 prose-p:my-5";
  
  return (
    <div className="flex-grow overflow-y-scroll">
      <Editable
        autoFocus
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className={`w-full block px-4 outline-none py-4 bg-inherit resize-none max-w-none md:px-[calc((100vw-738px)/2)] md:py-6 lg:px-[calc((100vw-800px)/2)] lg:py-8 dark:text-inherit ${proseClass}`}
      />
    </div>
  );
};

TextEditor.propTypes = {

};

export default TextEditor;