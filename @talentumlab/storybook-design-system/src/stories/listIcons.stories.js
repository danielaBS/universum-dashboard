// Button.stories.js

import React from 'react';
import ListIcons from '../components/lists/listIcons';

export default {
    title: 'Container/ListIcons',
    component: ListIcons,
};

//π We create a βtemplateβ of how args map to rendering
const Template = (args) => < ListIcons {
    ...args
}
/>;

//π Each story then reuses that template
export const Icons = Template.bind({});
Icons.args = {
    // src: 'action-home'
};

//π Each story then reuses that template
// export const Help = Template.bind({});
// Help.args = {
//     src: 'action-help'
// };

// //π Each story then reuses that template
// export const Check = Template.bind({});
// Check.args = {
//     src: 'action-check'
// };