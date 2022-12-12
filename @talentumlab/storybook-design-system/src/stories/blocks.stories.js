import React from "react";

import Blocks from "../components/blocks/blocks";

export default {
  title: "Diseño/Blocks",
  component: Blocks,
};

const Template = (args) => <Blocks {...args} />;

export const Card = Template.bind({});
Card.args = {
  width: "90%",
  fontSize: "1rem",
  resolution: 500,
  defItems: [
    {
      src: "./images/navigation/close.svg",
      title: "Title of Service 1",
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. imagen 1",
    },
    {
      src: "./images/navigation/check.svg",
      title: "Title of Service 2",
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. imagen 2",
    },
    {
      src: "./images/navigation/menu.svg",
      title: "Title of Service 3",
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. imagen 3",
    },
  ],
};
