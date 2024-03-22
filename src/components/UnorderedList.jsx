import PropTypes from "prop-types";

const UnorderedList = props => {

  const { attributes } = props;

  return (
    <ul {...attributes} className="text-color">
      {props.children}
    </ul>
  )
  
};

UnorderedList.propTypes = {
  attributes: PropTypes.object,
};

export default UnorderedList;