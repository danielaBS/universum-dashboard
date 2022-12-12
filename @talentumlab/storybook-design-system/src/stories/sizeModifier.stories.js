import React from "react";

import SizeModifier from "../components/sizeModifier/sizeModifier";

export default {
  title: "Diseño/SizeModifiers",
  component: SizeModifier,
};

const Template = (args) => <SizeModifier {...args} />;

export const Size_Modifier = Template.bind({});

Size_Modifier.args = {
  width: "100%",
  fontSize: "1rem",
};
