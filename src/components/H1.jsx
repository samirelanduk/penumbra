import PropTypes from "prop-types";

const H1 = props => {

  const { attributes } = props;

  return <h1 {...attributes} className="text-color">{props.children}</h1>
  
};

H1.propTypes = {
  attributes: PropTypes.object,
};

export default H1;