import React from "react";
import Banner from "../../banner/banner";
import Navbar from "../../navbar/navbar";
import Search from "../../search/search";
import "./header3.module.css";

const Header3 = () => {
  return (
    <div className="container-header3">
      <div>
        <Navbar colorButton={"#0E3192"} />
      </div>
      <div>
        <Search height={"3.2rem"} />
      </div>
      <div className="container-header3__row">
        <div>
          <Banner type={"Different Layout"} width={"19rem"} />
        </div>
        <div>
          <Banner type={"Different Layout"} width={"19rem"} />
        </div>
        <div>
          <Banner type={"Different Layout"} width={"19rem"} />
        </div>
      </div>
    </div>
  );
};

export default Header3;
