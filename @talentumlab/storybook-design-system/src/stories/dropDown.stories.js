import React from "react";

import DropDown from "../components/dropDown/dropDown";

export default {
  title: "Diseño/DropDown",
  component: DropDown,
};

const Template = (args) => <DropDown {...args} />;

export const Drop_Down = Template.bind({});
Drop_Down.args = {
  width: "100%",
  fontSize: "1rem",
  initialValue: "Drop down",
  options: [
    {
      key: 1,
      value: "Select Box 1",
    },
    {
      key: 2,
      value: "Select Box 2",
    },
    {
      key: 3,
      value: "Select Box 3",
    },
    {
      key: 4,
      value: "Select Box 4",
    },
  ],
  imageDropUp: "./images/navigation/arrow_forward.svg",
  imageDropDown: "./images/navigation/arrow_back.svg",
};
