import React from "react";
import PropTypes from "prop-types";
import "./sideBar.module.css";

/**
 *
 * @param {*} props
 * @returns
 */

const SideBar = (props) => {
  const {
    buttonBackgroundColor,
    buttonHoverColor,
    width,
    backgroundColor,
    actionNav,
    setActionNav,
    srcImage,
    arrowWhite,
    arrowBlack,
  } = props;

  const [buttonSetBackgroundColor, setBackgroundColor] = React.useState(
    buttonBackgroundColor
  );
  const [buttonSetBackgroundImage, setBackgroundImage] = React.useState(
    `url(${arrowBlack})`
  );

  function buttonCollapse() {
    return (
      <button
        className="side_bar__button_false"
        style={{
          backgroundColor: buttonSetBackgroundColor,
          transition: "all 0.3s",
          backgroundImage: buttonSetBackgroundImage,
          transform: actionNav ? "scale(-1,1)" : "scale(1,1)",
          backgroundRepeat: "no-repeat",
        }}
        onMouseEnter={() => {
          setBackgroundColor(buttonHoverColor);
          setBackgroundImage(`url(${arrowWhite})`);
        }}
        onMouseLeave={() => {
          setBackgroundColor(buttonBackgroundColor);
          setBackgroundImage(`url(${arrowBlack})`);
        }}
        onClick={() => {
          setActionNav(!actionNav);
        }}
      ></button>
    );
  }

  return (
    <>
      <div
        className="side_bar"
        style={{
          width: width,
          backgroundColor: backgroundColor,
          left: actionNav ? "0%" : "-" + width,
          backgroundImage: `url(${srcImage})`,
        }}
      >
        <div className="side_bar__content">{props.children}</div>
        {buttonCollapse("side_bar__button_false")}
      </div>
    </>
  );
};
export default SideBar;
SideBar.propTypes = {
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  buttonBackgroundColor: PropTypes.string,
  arrowBlack: PropTypes.string,
  arrowWhite: PropTypes.string,
  buttonHoverColor: PropTypes.string,
  srcImage: PropTypes.string,
};

SideBar.defaultProps = {
  width: "400px",
  backgroundColor: "white",
  buttonBackgroundColor: "#0670b0",
  buttonHoverColor: "#0e3192",
  arrowBlack: "./images/sidebar/arrowBlackRight.svg",
  arrowWhite: "./images/sidebar/arrowWhiteRight.svg",
  srcImage: "./images/sidebar/bg-sidebar.jpg",
};
