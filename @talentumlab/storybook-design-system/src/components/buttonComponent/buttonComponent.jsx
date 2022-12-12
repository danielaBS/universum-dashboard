import React from "react";
// import ErrorMessage from './Error';
import PropTypes from "prop-types";
import "./buttonComponent.module.css";
import Image from "../imageComponent/imageComponent";

const Button = (props) => {
  const { type, text, hasImage, disabled, btnWidth, color, srcImage } = props;

  const CLASSES_BUTTON = {
    outlined: "button button--outlined primary-text",
    contained: "button button--contained primary-3",
  };
  const CLASSES_DEFAULT = "button primary-text";

  const className = CLASSES_BUTTON[type] || CLASSES_DEFAULT;

  const stylesButton = {
    width: btnWidth,
    color: color,
    border: type === "outlined" && `1.5px solid ${color}`,
  };

  return (
    <div>
      <button
        onClick={props.passedFunction}
        type="button"
        style={stylesButton}
        className={className}
        disabled={disabled}
      >
        <div style={{ width: "15%", display: hasImage ? "" : "none" }}>
          <Image width="100%" src={srcImage} />
        </div>
        <div
          className="button--text"
          style={{ width: hasImage ? "80%" : "100%", color: color }}
        >
          {text}
        </div>
      </button>
    </div>
  );
};

export default Button; // Don’t forget to use export default!

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "outlined", "contained"]),
  disabled: PropTypes.bool,
  hasImage: PropTypes.bool,
  btnWidth: PropTypes.string,
  color: PropTypes.string,
  passedFunction: PropTypes.func,
  srcImage: PropTypes.string,
};

Button.defaultProps = {
  text: "ENABLED",
  type: "text",
  disabled: false,
  hasImage: false,
  btnWidth: "auto",
  color: "#ffffff",
  passedFunction: null,
  srcImage: "./images/content/add_circle.svg",
};
