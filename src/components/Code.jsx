import PropTypes from "prop-types";

const Code = props => {

  const { attributes } = props;

  return (
    <pre {...attributes} className="dark:bg-slate-700">
      <code>{props.children}</code>
    </pre>
  )

};

Code.propTypes = {
  attributes: PropTypes.object,
};

export default Code;