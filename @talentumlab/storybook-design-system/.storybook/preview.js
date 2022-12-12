
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

import '../src/components/colorComponent/colorComponent.css';
import '../src/components/typographic/typographic.css'
import '../src/components/buttonComponent/buttonComponent.css'