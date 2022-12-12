import React from "react";
import PropTypes from "prop-types";
import "./navbar.module.css";

const Navbar = (props) => {
  const {
    itemsLeft,
    itemsCenter,
    itemsRight,
    width,
    fontSize,
    height,
    bgColor,
    colorFont,
  } = props;

  const styles = {
    width: width,
    height: height,
    backgroundColor: bgColor,
    fontSize: fontSize,
    color: colorFont,
  };

  return (
    <nav className="navbar" style={styles}>
      <div className="navbar__container-left">{itemsLeft}</div>
      <div className="navbar__container-center">{itemsCenter}</div>
      <div className="navbar__container-right">{itemsRight}</div>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  colorFont: PropTypes.string.isRequired,
  itemsLeft: PropTypes.node.isRequired,
  itemsCenter: PropTypes.node.isRequired,
  itemsRight: PropTypes.node.isRequired,
};

Navbar.defaultProps = {
  width: "100%",
  height: "4rem",
  bgColor: "#00A4AD",
  fontSize: "0.9rem",
  colorFont: "#ffffff",
  itemsLeft: <div>Items Left</div>,
  itemsCenter: <div>Items Center</div>,
  itemsRight: <div>Items Right</div>,
};
