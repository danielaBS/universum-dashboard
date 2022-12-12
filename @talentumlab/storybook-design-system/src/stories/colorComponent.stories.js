// Button.stories.js

import React from 'react';
import ColorComponent from '../components/colorComponent/colorComponent';
import '../color.css'



export default {
    title: 'Diseño/Color',
    component: ColorComponent,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => < ColorComponent {
    ...args
}
/>;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {
    title: 'Color Primario',
    subtitle: '#32779D',
    colorBg: 'primary',
};

export const Primary2 = Template.bind({});
Primary2.args = {
    title: "Primary",
    subtitle: "#color",
    colorBg: "primary-2",
};

export const Primary3 = Template.bind({});
Primary3.args = {
    title: "Primary",
    subtitle: "#color",
    colorBg: "primary-3",
};

export const Primary4 = Template.bind({});
Primary4.args = {
    title: "Primary",
    subtitle: "#color",
    colorBg: "primary-4",
};



export const Secundary = Template.bind({});
Secundary.args = {
    title: "Secundary",
    subtitle: "#color",
    colorBg: "secundary-4",
};

export const Secundary2 = Template.bind({});
Secundary2.args = {
    title: "Secundary",
    subtitle: "#color",
    colorBg: "secundary-4-2",
};

export const Secundary3 = Template.bind({});
Secundary3.args = {
    title: "Secundary",
    subtitle: "#color",
    colorBg: "secundary-4-3",
};

export const Primary5 = Template.bind({});
Primary5.args = {
    title: "Primary",
    subtitle: "#color",
    colorBg: "primary-5",
};

export const Primary6 = Template.bind({});
Primary6.args = {
    title: "Primary",
    subtitle: "#color",
    colorBg: "primary-6",
};