import React from "react";
import PropTypes from "prop-types";
/* ------------------------------------ / ----------------------------------- */
import { Spinner } from "../icons";
import "./button.module.css";

const Button = ({
  primary,
  secondary,
  label,
  disabled,
  fullwidth,
  size,
  loading,
  ...props
}) => {
  let fontSize;
  let color;

  if (size === "small") {
    fontSize = "12px";
  }
  if (size === "large") {
    fontSize = "16px";
  }

  if (primary) {
    color = "primary_sst";
  }
  if (secondary) {
    color = "secondary_sst";
  }

  const style = {
    width: fullwidth ? "100%" : "auto",
    fontSize: fontSize,
  };

  return (
    <button
      className={["button_sst", color].join(" ")}
      disabled={disabled}
      style={style}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {label}
    </button>
  );
};

Button.defaultProps = {
  label: "Text here",
  size: "medium",
};

Button.protoTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  fullwidth: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  loading: PropTypes.bool,
};

export default Button;
