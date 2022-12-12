# Storybook design system Talentum

In the project directory, you can run:

### `npm run storybook`

In the project directory, you can run:

### `npm start`

## Build Storybook

`npm run build-storybook -- -o ./build`

## How to upload the changes to the package

document the changes in the CHANGELOG.md

`git add .`

example commit

`git commit -m "Changelog for v0.15.0"`

version package

`npm --allow-same-version version 0.1.3 -m "Bump version to: %s [skip ci]"`

publish package

`npm publish`

## How to import the components in Next.js

use dynamic imports

`npm run build-storybook -- -o ./build`

# Initialize project

You will need to remove the .npmrc file temporarily and use the following command line:

### npm config set registry http://registry.npmjs.org

Prior to `npm install` so that the project is able to find the node_modules, then add the .npmrc back
