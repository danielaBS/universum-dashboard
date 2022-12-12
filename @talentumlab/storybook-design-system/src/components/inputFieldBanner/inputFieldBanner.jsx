import React from "react";
import ButtonComponent from "../buttonComponent/buttonComponent";
import PropTypes from "prop-types";
import "./inputFieldBanner.module.css";

const InputFieldBanner = (props) => {
  const {
    width,
    fontSize,
    title,
    text,
    placeHolder,
    typeButton,
    textButton,
    colorButton,
  } = props;
  return (
    <div className="input-banner" style={{ width: width, fontSize: fontSize }}>
      <div className="input-banner__tittle">
        <span className="input-banner__dot"></span>
        <div>{title}</div>
      </div>
      <div>{text}</div>
      <div className="input-banner__input-field">
        <input type="input-banner__text" placeholder={placeHolder} />
      </div>
      <div>
        <ButtonComponent type={typeButton} text={textButton} color={colorButton} />
      </div>
    </div>
  );
};

export default InputFieldBanner;

InputFieldBanner.propTypes = {
  width: PropTypes.string,
  fontSize: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  typeButton: PropTypes.string,
  textButton: PropTypes.string,
  colorButton: PropTypes.string,
};

InputFieldBanner.defaultProps = {
  width: "23rem",
  fontSize: "1rem",
  title: "Headline",
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia deserunt dolor, id facilis",
  placeHolder: "Inset text here",
  typeButton: "outlined",
  textButton: "ENABLED",
  colorButton: "#0E3192",
};
