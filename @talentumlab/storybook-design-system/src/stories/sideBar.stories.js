import React from "react";

import SideBar from "../components/sideBar_v1/sideBar";

export default {
  title: "Diseño/SideBar",
  component: SideBar,
};

const Template = (args) => <SideBar {...args} />;

export const Side__Bar = Template.bind({});
Side__Bar.args = {
  width: "300px",
  backgroundColor: "white",
};
