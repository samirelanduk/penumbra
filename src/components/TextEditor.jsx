import { useCallback, useContext } from "react";
import { Editable } from "slate-react";
import { PreviewContext } from "@/contexts";
import Paragraph from "./Paragraph";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import Blockquote from "./Blockquote";
import OrderedList from "./OrderedList";
import UnorderedList from "./UnorderedList";
import ListItem from "./ListItem";
import Code from "./Code";

const TextEditor = () => {

  const preview = useContext(PreviewContext);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "h1": return <H1 {...props} />
      case "h2": return <H2 {...props} />
      case "h3": return <H3 {...props} />
      case "blockquote": return <Blockquote {...props} />
      case "ol": return <OrderedList {...props} />
      case "ul": return <UnorderedList {...props} />
      case "li": return <ListItem {...props} />
      case "code": return <Code {...props} />
      default: return <Paragraph {...props} />
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