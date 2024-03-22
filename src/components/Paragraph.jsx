import PropTypes from "prop-types";

const Paragraph = props => {

  const { attributes } = props;

  return <p {...attributes}>{props.children}</p>
  
};

Paragraph.propTypes = {
  attributes: PropTypes.object,
};

export default Paragraph;