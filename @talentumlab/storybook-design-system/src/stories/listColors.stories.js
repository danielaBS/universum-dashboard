// Button.stories.js

import React from 'react';
import ColorDTI from '../components/lists/listColorDTI';

export default {
    title: 'Container/ListColors',
    component: ColorDTI,
};

//π We create a βtemplateβ of how args map to rendering
const Template = (args) => < ColorDTI {
    ...args
}
/>;

//π Each story then reuses that template
export const DTI_Colors = Template.bind({});
DTI_Colors.args = {
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