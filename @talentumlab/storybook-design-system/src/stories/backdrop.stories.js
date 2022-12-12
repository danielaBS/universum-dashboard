import React from "react";
import Backdrop from "../components/backdrop";


export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/SST/Backdrop",
  component: Backdrop,
 /*  argTypes: {
    size: { control: "radio", options: ["small", "medium", "large"] },
  }, */
};
//👇 We create a “template” of how args map to rendering
const Template = (args) => <Backdrop {...args} />;

export const Basic = Template.bind({});