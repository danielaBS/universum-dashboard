import React from "react";
import Banner from "../../banner/banner";
import InputFieldBanner from "../../inputFieldBanner/inputFieldBanner";
import Navbar from "../../navbar/navbar";
import Search from "../../search/search";
import "./header2.module.css";

const Header2 = () => {
  return (
    <div className="container-header2">
      <div>
        <Navbar colorButton={"#0E3192"} />
      </div>
      <div>
        <Search height={"3.2rem"} />
      </div>
      <div className="container-header2__row">
        <div>
          <Banner type={"Different Layout"} width={"100%"} />
        </div>
        <div>
          <InputFieldBanner />
        </div>
      </div>
    </div>
  );
};

export default Header2;
