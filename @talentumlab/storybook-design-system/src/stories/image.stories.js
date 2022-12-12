// Button.stories.js

import React from 'react';
import Image from '../components/imageComponent/imageComponent';

export default {
    title: 'Diseño/Image',
    component: Image,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => < Image {
    ...args
}
/>;

//👇 Each story then reuses that template
export const Home = Template.bind({});
Home.args = {
    src: "./images/action/home.svg",
    width: "60px",
};

//👇 Each story then reuses that template
export const Help = Template.bind({});
Help.args = {
    src: './images/content/add_circle.svg',
    width: "10%",
};

//👇 Each story then reuses that template
export const ImageDefault = Template.bind({});
ImageDefault.args = {
    src: './images/default/default.png',
    width: "30%",
};