import React from "react";
import PropTypes from "prop-types";
import "./circular.module.css";

/**
 *
 * @param {*} props
 * @returns
 */
const Circular= (props) => {
  // parametrizar el paso de color, para que haga una búsqueda en un array con los colores 
  var colorSearch = props.colorBorder === "primary" ? "#13007C" : "#32779D";
  var borderSize = Number.parseInt(props.size) / 10;
  const styles = {
    border: borderSize + "rem solid #ffffff",
    borderTop: borderSize + "rem solid" + colorSearch,
    borderRight: borderSize + "rem solid" + colorSearch,
    borderBottom: borderSize + "rem solid" + colorSearch,
    height: props.size + "rem ",
    width: props.size + "rem ",
  };
  return <div className="circularLoader" style={styles}></div>;
}
export default Circular;

Circular.propTypes = {
  colorBorder: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.number.isRequired,
};

Circular.defaultProps = {
  colorBorder: "primary",
  size: 2,
};
