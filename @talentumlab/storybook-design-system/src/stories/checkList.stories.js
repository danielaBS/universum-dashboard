import React from "react";

import CheckList from "../components/checkList/checkList";

export default {
  title: "Diseño/CheckList",
  component: CheckList,
};

const Template = (args) => <CheckList {...args} />;

export const Check_list = Template.bind({});
Check_list.args = {
  defItems: [
    { name: "this is first line" },
    { name: "this is second line" },
    { name: "this is third line" },
  ],
  checkColor: "#32779D",
  selected: "",
  setSelected: () => {},
  fontSize: "23px",
};
