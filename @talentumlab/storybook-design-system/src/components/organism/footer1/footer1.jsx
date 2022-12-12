import React from "react";
import PropTypes from "prop-types";
import "./footer1.module.css";
import Image from "../../imageComponent/imageComponent";

const Footer1 = (props) => {
  const {
    width,
    fontSize,
    textLogo,
    date,
    slogan,
    textSlogan,
    icons,
    website,
  } = props;

  let socialIcons = icons.map((icon, i) => (
    <div key={i}>
      <Image src={icon.src} />
    </div>
  ));

  return (
    <div
      className="container-footer1"
      style={{ width: width, fontSize: fontSize }}
    >
      <div className="container-footer1__column-left">
        <div className="container-footer1__content-logo">
          <span className="container-footer1__dot" />
          <div>{textLogo}</div>
          <div>{date}</div>
        </div>
        <div>{slogan}</div>
        <div>{textSlogan}</div>
      </div>
      <div className="container-footer1__column-right">
        <div className="container-footer1__navigation-links">
          <div>
            <div>Navigation</div>
            <div>Page 1</div>
            <div>Page 2</div>
            <div>Page 3</div>
            <div>Page 4</div>
          </div>
          <div>
            <div>Links</div>
            <div>Link 1</div>
            <div>Link 2</div>
            <div>Link 3</div>
            <div>Link 4</div>
          </div>
        </div>
        <div className="container-footer1__contact-links">
          <div>Follow us</div>
          <div className="container-footer1__content-icons">{socialIcons}</div>
          <div>Website</div>
          <div>{website}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer1;

Footer1.propTypes = {
  textLogo: PropTypes.string,
  date: PropTypes.string,
  slogan: PropTypes.string,
  textSlogan: PropTypes.string,
  icons: PropTypes.array,
  website: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
};

Footer1.defaultProps = {
  fontSize: "0.9rem",
  width: "100%",
  textLogo: "WEBLOGO",
  date: "© 2021",
  slogan: "Website slogan",
  textSlogan:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, deserunt!",
  icons: [
    {
      id: 1,
      src: "./images/social/facebook.svg",
    },
    {
      id: 2,
      src: "./images/social/instagram.svg",
    },
    {
      id: 3,
      src: "./images/social/twitter.svg",
    },
    {
      id: 4,
      src: "./images/social/linkedin.svg",
    },
  ],
  website: "website.com",
};
