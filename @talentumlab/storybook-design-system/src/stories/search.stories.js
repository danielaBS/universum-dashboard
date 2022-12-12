import React from "react";

import Search from "../components/search/search";

export default {
  title: "Diseño/Search",
  component: Search,
};

const Template = (args) => <Search {...args} />;

export const With_Icon = Template.bind({});
With_Icon.args = {
  leftIcon: true,
  srcIcon: "./images/action/search-v2.png",
};

export const No_Icon = Template.bind({});
No_Icon.args = {
  leftIcon: false,
  srcIcon: "./images/action/search-v2.png",
  inputBackgroundColor: "#00b4cc",
};
