import PropTypes from "prop-types";

const Blockquote = props => {

  const { attributes } = props;

  return (
    <blockquote {...attributes} className="text-color">
      {props.children}
    </blockquote>
  )
  
};

Blockquote.propTypes = {
  attributes: PropTypes.object,
};

export default Blockquote;