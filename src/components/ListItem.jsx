import PropTypes from "prop-types";

const ListItem = props => {

  const { attributes } = props;

  return (
    <li {...attributes} className="text-color">
      {props.children}
    </li>
  )
  
};

ListItem.propTypes = {
  attributes: PropTypes.object,
};

export default ListItem;