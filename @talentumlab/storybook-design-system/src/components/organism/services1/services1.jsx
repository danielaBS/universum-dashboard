import React from "react";
import Blocks from "../../blocks/blocks";
import ImageCaption from "../../imageCaption/imageCaption";
import Search from "../../search/search";
import "./services1.module.css";

const Services1 = () => {
  return (
    <div className="container-service1">
      <div>
        <Search height={"3.2rem"} />
      </div>
      <div className="container-service1__row">
        <div>
          <ImageCaption />
        </div>
        <div>
          <Blocks resolution={2000} />
        </div>
      </div>
    </div>
  );
};

export default Services1;
