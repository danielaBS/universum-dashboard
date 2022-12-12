import React from "react";
import Blocks from "../../blocks/blocks";
import ImageCaption from "../../imageCaption/imageCaption";
import Search from "../../search/search";
import SizeModifier from "../../sizeModifier/sizeModifier";
import "./services2.module.css";

const Services2 = () => {
  return (
    <div className="container-service2">
      <div className="container-service2__colunm-left">
        <Search height={"3.2rem"} />
        <div>
          <ImageCaption />
        </div>
      </div>
      <div className="container-service2__colunm-right">
        <div>
          <Blocks resolution={2000} />
        </div>
        <div>
          <SizeModifier />
        </div>
      </div>
    </div>
  );
};

export default Services2;
