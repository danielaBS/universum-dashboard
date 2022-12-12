import React from "react";
import Blocks from "../../blocks/blocks";
import DropDown from "../../dropDown/dropDown";
import ImageCaption from "../../imageCaption/imageCaption";
import SizeModifier from "../../sizeModifier/sizeModifier";
import "./services3.module.css";

const Services3 = () => {
  const defItems = [
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
  ];

  return (
    <div className="container-service3">
      <div>
        <DropDown width={"100%"} />
      </div>
      <div>
        <ImageCaption />
      </div>
      <div className="container-service3__row">
        <div>
          <SizeModifier />
        </div>
        <div>
          <Blocks resolution={500} widthCard={"100%"} defItems={defItems} />
        </div>
      </div>
    </div>
  );
};

export default Services3;
