import React from "react";

import ImageCaption from "../components/imageCaption/imageCaption";

export default {
  title: "Diseño/ImageCaption",
  component: ImageCaption,
};

const Template = (args) => <ImageCaption {...args} />;

export const Image_Caption = Template.bind({});
Image_Caption.args = {
  width: "100%",
  fontSize: "1rem",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  srcContent: "./images/default/default.png",
};
