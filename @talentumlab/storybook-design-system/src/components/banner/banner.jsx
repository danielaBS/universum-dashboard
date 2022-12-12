import React from "react";
import ButtonComponent from "../buttonComponent/buttonComponent";
import PropTypes from "prop-types";
import "./banner.module.css";
import DifferentLayoutBanner from "../differentLayoutBanner/differentLayoutBanner";

const Banner = (props) => {
  const {
    width,
    fontSize,
    subTitle,
    title,
    text,
    typeButton,
    type,
    timePublished,
    src,
  } = props;

  const styles = {
    backgroundImage: `url(${src})`,
  };

  return type !== "Different Layout" ? (
    <div className="banner" style={{ width: width }}>
      <div className="banner--background" style={styles}>
        <div className="banner__info" style={{ fontSize: fontSize }}>
          <header className="banner__info__header">
            <div className="banner__info__header--subtitle">{subTitle}</div>
            {type === "Horizontal" ? (
              <div className="banner__info__header--published">
                published <strong>{timePublished}</strong>
              </div>
            ) : null}
          </header>
          <div className="banner__info--title">{title}</div>
          <div className="banner__info--text">{text}</div>
          <div>
            <ButtonComponent type={typeButton} color={"#ffffff"} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <DifferentLayoutBanner
      width={width}
      fontSize={fontSize}
      title={title}
      text={text}
      typeButton={typeButton}
      src={src}
    />
  );
};

export default Banner;

Banner.propTypes = {
  width: PropTypes.string,
  fontSize: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  typeButton: PropTypes.oneOf(["text", "outlined", "contained"]),
  type: PropTypes.oneOf(["Gradient", "Horizontal", "Different Layout"]),
  src: PropTypes.string,
  timePublished: PropTypes.string,
};

Banner.defaultProps = {
  width: "21rem",
  fontSize: "1rem",
  subTitle: "SPONSORE",
  title: "Promotion",
  text:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est minus impedit eius",
  typeButton: "outlined",
  type: "Gradient",
  src: "./images/banner/fondo-banner.jpg",
  timePublished: "Yesterday",
};
