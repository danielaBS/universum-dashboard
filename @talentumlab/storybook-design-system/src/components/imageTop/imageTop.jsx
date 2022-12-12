import React from "react";
// import ErrorMessage from '../Others/Error';
import PropTypes from "prop-types";
import Image from "../imageComponent/imageComponent";
import ButtonComponent from "../buttonComponent/buttonComponent";
import ImageCaption from "../imageCaption/imageCaption";
import "./imageTop.module.css";

const ImageTop = (props) => {
  const {
    width,
    fontSize,
    title,
    subTitle,
    srcAcount,
    icon,
    srcContent,
    text,
    type,
    colorButton,
  } = props;

  return (
    <div className="image-top" style={{ width: width, fontSize: fontSize }}>
      <div className="image-top__header">
        <div className="image-top__header--center">
          <Image width="30%" src={srcAcount} />
          <div className="image-top__header--content">
            <span className="image-top__header--headline">{title}</span>
            <br />
            <span className="image-top__header--subtitle">{subTitle}</span>
          </div>
        </div>
        <a
          style={{ width: "10%" }}
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image width="100%" src={icon} />
        </a>
      </div>
      <ImageCaption dependent text={text} srcContent={srcContent} />
      <div className="image-top__button">
        <ButtonComponent type={type} color={colorButton} />
      </div>
    </div>
  );
};

export default ImageTop; // Don’t forget to use export default!

ImageTop.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  text: PropTypes.string,
  srcAcount: PropTypes.string,
  icon: PropTypes.string,
  srcContent: PropTypes.string,
  type: PropTypes.oneOf(["outlined", "contained"]),
  width: PropTypes.string,
  fontSize: PropTypes.string,
};

ImageTop.defaultProps = {
  title: "Headline",
  subTitle: "Body",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  srcAcount: "./images/action/account_circle.svg",
  icon: "./images/social/share.svg",
  srcContent: "./images/default/default.png",
  type: "contained",
  width: "100%",
  fontSize: "1rem",
};
