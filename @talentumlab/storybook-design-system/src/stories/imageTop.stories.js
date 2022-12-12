import React from "react";

import ImageTop from "../components/imageTop/imageTop";

export default {
  title: "Diseño/ImageTop",
  component: ImageTop,
};

const Template = (args) => <ImageTop {...args} />;

export const Image_Top = Template.bind({});
Image_Top.args = {
  title: "Headline",
  subTitle: "Body",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  srcAcount: "./images/action/account_circle.svg",
  icon: "./images/social/share.svg",
  srcContent: "./images/default/default.png",
  type: "contained",
  width: "100%",
  fontSize: "1rem",
};
