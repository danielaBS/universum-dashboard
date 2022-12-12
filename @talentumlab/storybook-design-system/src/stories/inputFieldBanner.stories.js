import React from "react";

import InputFieldBanner from "../components/inputFieldBanner/inputFieldBanner";

export default {
  title: "Diseño/InputFieldBanner",
  component: InputFieldBanner,
};

const Template = (args) => <InputFieldBanner {...args} />;

export const Input_Field_Banner = Template.bind({});
Input_Field_Banner.args = {
  width: "23rem",
  fontSize: "1rem",
  title: "Headline",
  text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia deserunt dolor, id facilis",
  placeHolder: "Inset text here",
  typeButton: "outlined",
  textButton: "ENABLED",
  colorButton: "#0E3192",
};
