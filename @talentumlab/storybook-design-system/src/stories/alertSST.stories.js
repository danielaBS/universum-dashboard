import React from "react";
import Alert from "../components/alertSST";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/SST/Alert",
  component: Alert,
  argTypes: {
    text: { control: "text"},
  },
};

const Template = (args) => <Alert {...args} />;

export const Error = Template.bind({});

Error.args = {
  text: "This is an error alert — check it out!",
  error: true,
};

export const Success = Template.bind({});

Success.args = {
  text: "This is a success alert — check it out!",
  success: true,
};

export const Warning = Template.bind({});

Warning.args = {
  text: "This is a warning alert — check it out!",
  warning: true,
};

export const Info = Template.bind({});

Info.args = {
  text: "This is an info alert — check it out!",
  info: true,
};
