import React from "react";

import DropDownV2 from "../components/dropDown_v2/dropDown_v2";

export default {
  title: "Diseño/DropDown V2",
  component: DropDownV2,
};

const Template = (args) => <DropDownV2 {...args} />;

export const CustomClass = Template.bind({});
CustomClass.args = {
  className: "customClass",
};

export const NoCustomClassname = Template.bind({});
NoCustomClassname.args = {
  backgroundColor: "#0a8177",
};

export const Gap = Template.bind({});
Gap.args = {
  dropdownGap: 0,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
