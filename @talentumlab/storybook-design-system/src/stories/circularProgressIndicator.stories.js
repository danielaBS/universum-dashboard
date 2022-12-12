import React from "react";
import Circular from "../components/progressIndicator/circular";

export default {
  title: "Diseño/CircularProgress",
  component: Circular,
};

const Template = (args) => <Circular {...args} />;


export const CircularProgress = Template.bind({});
CircularProgress.args = {
    colorBorder: "primary",
    size: 2,
  };


