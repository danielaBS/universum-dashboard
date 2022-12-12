import React, { useState } from "react";
import PropTypes from "prop-types";
import "./buttonCommon.module.css";
import Image from "../imageComponent/imageComponent";

const ButtonCommon = (props) => {
  const {
    width,
    height,
    text,
    fontSize,
    borderRadius,
    type,
    color,
    bgColor,
    bgColorHover,
    passedFunction,
    border,
    disabled,
    iconButton,
    showIcon,
  } = props;

  const [styles, setStyles] = useState({
    width: width,
    height: height,
    borderRadius: borderRadius,
    color: color,
    fontSize: fontSize,
    background: bgColor,
    border: border,
    cursor: disabled ? "default" : "pointer",
  });

  return (
    <button
      type={type}
      className="button__common"
      style={
        disabled
          ? { ...styles, color: "#969696", background: "#C8C8C8" }
          : styles
      }
      onClick={passedFunction}
      onMouseEnter={() => setStyles({ ...styles, background: bgColorHover })}
      onMouseLeave={() => setStyles({ ...styles, background: bgColor })}
      disabled={disabled}
    >
      {showIcon && (
        <span className="button__common_icon">
          <Image width="100%" src={iconButton} />
        </span>
      )}
      {text}
    </button>
  );
};

export default ButtonCommon;

ButtonCommon.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["submit", "button", "reset"]).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  passedFunction: PropTypes.func,
  borderRadius: PropTypes.string.isRequired,
  border: PropTypes.string,
  borderColor: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  showIcon: PropTypes.bool.isRequired,
  iconButton: PropTypes.string,
};

ButtonCommon.defaultProps = {
  text: "Text Here",
  type: "button",
  width: "100%",
  height: "2.9rem",
  color: "#ffffff",
  bgColor: "#00A4AD",
  bgColorHover: "#25C4CD",
  passedFunction: null,
  borderRadius: "13px",
  border: "0px solid black",
  disabled: false,
  showIcon: false,
  iconButton: "./images/action/add.svg",
};
