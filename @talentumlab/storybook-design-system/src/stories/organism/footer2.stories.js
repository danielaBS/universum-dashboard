import React from "react";

import Footer2 from "../../components/organism/footer2/footer2";

export default {
  title: "Organism/Footer 2",
  component: Footer2,
};

const Template = (args) => <Footer2 {...args} />;

export const Footer_2 = Template.bind({});
Footer_2.args = {
  fontSize: "0.9rem",
  width: "100%",
  textLogo: "WEBLOGO",
  date: "© 2021",
};
