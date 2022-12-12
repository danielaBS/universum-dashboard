import React from "react";
import Banner from "../../banner/banner";
import Navbar from "../../navbar/navbar";
import Search from "../../search/search";
import "./header1.module.css";

const Header1 = () => {
  return (
    <div className="container-header1">
      <div>
        <Navbar colorButton={"#0E3192"} />
      </div>
      <div>
        <Search height={"3.2rem"} />
      </div>
      <div>
        <Banner type={"Horizontal"} width={"100%"} />
      </div>
    </div>
  );
};

export default Header1;
