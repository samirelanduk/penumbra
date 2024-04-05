import PropTypes from "prop-types";

const CodeLine = props => {

  const { attributes } = props;

  return (
    <div {...attributes}>
      {props.children}
    </div>
  )
  
};

CodeLine.propTypes = {
  attributes: PropTypes.object,
};

export default CodeLine;