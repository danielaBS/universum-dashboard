// Button.stories.js

import React from 'react';
import ListButtons from '../components/lists/listButtons';

export default {
    title: 'Container/ListButtons',
    component: ListButtons,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => < ListButtons {
    ...args
}
/>;

//👇 Each story then reuses that template
export const Buttons = Template.bind({});
Buttons.args = {
    // src: 'action-home'
};

//👇 Each story then reuses that template
// export const Help = Template.bind({});
// Help.args = {
//     src: 'action-help'
// };

// //👇 Each story then reuses that template
// export const Check = Template.bind({});
// Check.args = {
//     src: 'action-check'
// };