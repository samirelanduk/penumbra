import PropTypes from "prop-types";

const OrderedList = props => {

  const { attributes } = props;

  return (
    <ol {...attributes} className="text-color">
      {props.children}
    </ol>
  )
  
};

OrderedList.propTypes = {
  attributes: PropTypes.object,
};

export default OrderedList;