import PropTypes from "prop-types";

const H2 = props => {

  const { attributes } = props;

  return <h2 {...attributes} className="text-color">{props.children}</h2>
  
};

H2.propTypes = {
  attributes: PropTypes.object,
};

export default H2;