import React from "react";

import Button from "../components/button";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/SST/Button",
  component: Button,
  argTypes: {
    size: { control: "radio", options: ["small", "medium", "large"] },
  },
};
//👇 We create a “template” of how args map to rendering
const Template = (args) => <Button {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: "Text here",
  fullwidth: false,
  size: "medium",
};

export const Primary = Template.bind({});
Primary.args = {
  ...Basic.args,
  primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Basic.args,
  secondary: true,
};

export const Disabled = Template.bind({});
Disabled.args = { ...Basic.args, disabled: true };

export const Loading = Template.bind({});
Loading.args = { ...Disabled.args, loading: true };
