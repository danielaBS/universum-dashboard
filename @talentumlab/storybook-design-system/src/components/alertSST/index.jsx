import React from "react";
import PropTypes from "prop-types";
/* ------------------------------------ / ----------------------------------- */
import "./alert_sst.module.css";
import { Error, Info, Success, Warning } from "../icons";

const Alert = ({ text, error, success, warning, info, ...props }) => {
  const changeColor = () => {
    if (error) {
      return "rgb(95, 33, 32)";
    }
    if (warning) {
      return "rgb(102, 60, 0)";
    }
    if (info) {
      return "rgb(1, 67, 97)";
    }
    if (success) {
      return "rgb(30, 70, 32)";
    }
  };

  const changeBackground = () => {
    if (error) {
      return "rgb(253, 237, 237)";
    }
    if (warning) {
      return "rgb(255, 244, 229)";
    }
    if (info) {
      return "rgb(229, 246, 253)";
    }
    if (success) {
      return "rgb(237, 247, 237)";
    }
  };

  const changeIcon = () => {
    if (error) {
      return <Error />;
    }
    if (warning) {
      return <Warning />;
    }
    if (success) {
      return <Success />;
    }
    if (info) {
      return <Info />;
    }
  };

  return (
    <div
      style={{ color: changeColor(), backgroundColor: changeBackground() }}
      className="alert_sst"
      {...props}
    >
      {changeIcon()}
      {text}
    </div>
  );
};

Alert.defaultProps = {
  text: "Text here",
};

Alert.protoTypes = {
  text: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  info: PropTypes.bool,
};

export default Alert;
