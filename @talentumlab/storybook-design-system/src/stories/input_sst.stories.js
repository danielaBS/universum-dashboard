import React from "react";

import Input from "../components/inputSST";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/SST/Input",
  component: Input,
  argTypes: {
    variant: { control: "radio", options: ["text", "password"] },
  },
};
//👇 We create a “template” of how args map to rendering
const Template = (args) => <Input {...args} />;

export const Text = Template.bind({});

Text.args = {
  variant: "text",
  label: "Text here",
  show_label: false,
};

export const Password = Template.bind({});

Password.args = {
  ...Text.args,
  variant: "password",
};

export const Error = Template.bind({});

Error.args = {
  ...Text.args,
  error: "",
  show_error: true,
};