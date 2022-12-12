const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@talentumlab/storybook-design-system']); // pass the modules you would like to see transpiled

module.exports = withPlugins([withTM()], {
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
