import React from "react";

import Banner from "../components/banner/banner";

export default {
  title: "Diseño/Banner",
  component: Banner,
};

const Template = (args) => <Banner {...args} />;

export const Gradient = Template.bind({});
Gradient.args = {
  width: "21rem",
  fontSize: "1rem",
  subTitle: "SPONSORE",
  title: "Promotion",
  text:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est minus impedit eius",
  typeButton: "outlined",
  type: "Gradient",
  src: "./images/banner/fondo-banner.jpg",
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  width: "100%",
  fontSize: "1rem",
  subTitle: "FEATURED",
  title: "Title of the horizontal block",
  text:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est minus impedit eius Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est minus impedit eius Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est minus impedit eius",
  typeButton: "outlined",
  type: "Horizontal",
  src: "./images/banner/fondo-banner.jpg",
  timePublished: "Yesterday",
};

export const DifferentLayout = Template.bind({});
DifferentLayout.args = {
  width: "70%",
  fontSize: "1rem",
  title: "Promotion",
  text:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est minus impedit eius Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est minus impedit eius",
  typeButton: "outlined",
  type: "Different Layout",
  src: "./images/banner/fondo-banner.jpg",
  timePublished: "Yesterday",
  textButton1: "ENABLED",
  textButton2: "HOVERED",
};
