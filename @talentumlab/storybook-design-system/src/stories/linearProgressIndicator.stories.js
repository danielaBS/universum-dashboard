import React from "react";
import Linear from "../components/progressIndicator/linear";

export default {
  title: "Diseño/LinearProgress",
  component: Linear,
};
const Template = (args) => <Linear {...args} />;

export const LinearProgress = Template.bind({});
LinearProgress.args = {
  width: "40%",
  colorType: "primary",
};
