import React from "react";

import DropDownMenu from "../components/dropDownMenu/dropDownMenu";

export default {
  title: "Diseño/DropDownMenu",
  component: DropDownMenu,
};

const Template = (args) => <DropDownMenu {...args} />;

export const DropDown_Menu = Template.bind({});
DropDown_Menu.args = {
  width: "10rem",
  fontSize: "1rem",
  items: [
    {
      id: 1,
      text: "First Option",
    },
    {
      id: 2,
      text: "Second Option",
    },
    {
      id: 3,
      text: "Third Option",
    },
  ],
  src: "./images/navigation/arrow_forward.svg",
};
