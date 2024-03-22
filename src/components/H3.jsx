import PropTypes from "prop-types";

const H3 = props => {

  const { attributes } = props;

  return <h3 {...attributes} className="text-color">{props.children}</h3>
  
};

H3.propTypes = {
  attributes: PropTypes.object,
};

export default H3;