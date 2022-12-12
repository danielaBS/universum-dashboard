import React from "react";

import ButtonComponent from "../components/buttonComponent/buttonComponent";

export default {
  title: "Diseño/Button",
  component: ButtonComponent,
};

const Template = (args) => <ButtonComponent {...args} />;

export const Text = Template.bind({});
Text.args = {
  text: "ENABLED",
  type: "text",
  disabled: false,
  hasImage: false,
  btnWidth: "auto",
  srcImage: "./images/content/add_circle.svg",
};

export const Outlined = Template.bind({});
Outlined.args = {
  text: "ENABLED",
  type: "outlined",
  disabled: false,
  hasImage: true,
  btnWidth: "auto",
  srcImage: "./images/content/add_circle.svg",
};

export const Contained = Template.bind({});
Contained.args = {
  text: "ENABLED",
  type: "contained",
  disabled: false,
  hasImage: false,
  btnWidth: "auto",
  srcImage: "./images/content/add_circle.svg",
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: "DISABLED",
  type: "text",
  disabled: true,
  hasImage: true,
  btnWidth: "auto",
  srcImage: "./images/content/add_circle.svg",
};
