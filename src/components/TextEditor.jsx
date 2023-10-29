import { useCallback } from "react";
import PropTypes from "prop-types";
import { Editable } from "slate-react";

const TextEditor = props => {

  const { document, setDocument } = props;

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
  
  return (
    <div className="flex-grow overflow-y-scroll">
      <Editable
        autoFocus
        renderElement={renderElement}
        className="w-full block px-4 outline-none py-4 bg-inherit resize-none max-w-none prose lg:prose-xl md:px-[calc((100vw-738px)/2)] md:py-6 lg:px-[calc((100vw-800px)/2)] lg:py-8 dark:text-inherit"
      />
    </div>
  );
};

TextEditor.propTypes = {
  document: PropTypes.object,
  setDocument: PropTypes.func.isRequired
};

export default TextEditor;