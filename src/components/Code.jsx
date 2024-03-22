import PropTypes from "prop-types";

const Code = props => {

  const { attributes } = props;

  return (
    <pre {...attributes}>
      <code>{props.children}</code>
    </pre>
  )

};

Code.propTypes = {
  attributes: PropTypes.object,
};

export default Code;