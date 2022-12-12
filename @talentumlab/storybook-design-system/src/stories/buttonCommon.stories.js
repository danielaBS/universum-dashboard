import React from "react";

import ButtonCommon from "../components/buttonCommon/buttonCommon";

export default {
  title: "Diseño/ButtonCommon",
  component: ButtonCommon,
};

const Template = (args) => <ButtonCommon {...args} />;

export const Button__Common = Template.bind({});
Button__Common.args = {
  text: "Text Here",
  type: "button",
  width: "100%",
  height: "2.9rem",
  color: "#ffffff",
  bgColor: "#445000",
  passedFunction: null,
  borderRadius: "13px",
};
