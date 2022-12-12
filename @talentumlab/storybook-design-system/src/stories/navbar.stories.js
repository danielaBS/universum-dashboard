import React from "react";

import Navbar from "../components/navbar/navbar";

export default {
  title: "Diseño/Navbar",
  component: Navbar,
};

const Template = (args) => <Navbar {...args} />;

export const Button = Template.bind({});
Button.args = {
  width: "100%",
  fontSize: "0.9rem",
  src: "./images/social/share.svg",
  action: "button",
  typeButton: "outlined",
  titleHome: "HOME",
  title1: "PAGE 1",
  title2: "PAGE 2",
};

export const Search = Template.bind({});
Search.args = {
  width: "100%",
  fontSize: "0.9rem",
  src: "./images/social/share.svg",
  action: "search",
  typeButton: "outlined",
  widthSearch: "auto",
  titleHome: "HOME",
  title1: "PAGE 1",
  title2: "PAGE 2",
};
