import React from "react";

import Tooltip from "../components/tooltip/tooltip";

export default {
  title: "Diseño/Tooltip",
  component: Tooltip,
};

const Template = (args) => <Tooltip {...args} />;

export const Tool_tip = Template.bind({});

Tool_tip.args = {
    direction: "bottom",
};