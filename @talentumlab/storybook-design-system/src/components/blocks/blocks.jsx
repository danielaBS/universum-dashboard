import React from "react";
import BlocksMobile from "../blocksMobile/blocksMobile";
import Image from "../imageComponent/imageComponent";
// import ErrorMessage from './Error';
import PropTypes from "prop-types";
import "./blocks.module.css";

const Blocks = (props) => {
  const { fontSize, width, defItems, resolution } = props;
  const [widthResolution, setWidthResolution] = React.useState(
    window.innerWidth
  );

  React.useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidthResolution(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  if (widthResolution < resolution) {
    return <BlocksMobile defItem={defItems}></BlocksMobile>;
  } else {
    let divItems = defItems.map((item, i) => (
      <div key={i} className="blocks__item primary-3-border">
        <Image width="20%" src={item.src}></Image>
        <div style={{ width: "70%" }}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      </div>
    ));

    return (
      <div className="blocks" style={{ width: width, fontSize: fontSize }}>
        {divItems}
      </div>
    );
  }
};

export default Blocks; // Don’t forget to use export default!

Blocks.propTypes = {
  width: PropTypes.string,
  fontSize: PropTypes.string,
  defItems: PropTypes.array,
  resolution: PropTypes.number,
};

Blocks.defaultProps = {
  width: "90%",
  fontSize: "1rem",
  resolution: 500,
  defItems: [
    {
      src: "./images/navigation/close.svg",
      title: "Title of Service 1",
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. imagen 1",
    },
    {
      src: "./images/navigation/check.svg",
      title: "Title of Service 2",
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. imagen 2",
    },
    {
      src: "./images/navigation/menu.svg",
      title: "Title of Service 3",
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. imagen 3",
    },
  ],
};
