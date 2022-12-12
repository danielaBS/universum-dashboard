import React from "react";

import Footer1 from "../../components/organism/footer1/footer1";

export default {
  title: "Organism/Footer 1",
  component: Footer1,
};

const Template = (args) => <Footer1 {...args} />;

export const Footer_1 = Template.bind({});
Footer_1.args = {
  fontSize: "0.9rem",
  width: "100%",
  textLogo: "WEBLOGO",
  date: "© 2021",
  slogan: "Website slogan",
  textSlogan:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, deserunt!",
  icons: [
    {
      id: 1,
      src: "./images/social/facebook.svg",
    },
    {
      id: 2,
      src: "./images/social/instagram.svg",
    },
    {
      id: 3,
      src: "./images/social/twitter.svg",
    },
    {
      id: 4,
      src: "./images/social/linkedin.svg",
    },
  ],
  website: "website.com",
};
