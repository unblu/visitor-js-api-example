# Integrating Unblu Floating JS API as es-module library

This example shows how to integrate the Unblu Floating JS API into a JS project that is built and bundled with *webpack*.
The `unblu-visitor-api` has been added as an *npm* dependency as can be seen in the `dependencies` section of the [package.json](./package.json) file.

**Note:** *In order to guarantee compatibility, make sure you always use the same version of the Unblu Visitor JS API as the version of the Unblu collaboration server it is runing against.*

For more information about the Unblu Visitor JS API see its [documentation](https://www.unblu.com/en/docs/latest/reference/unblu-visitor-js-api/).


## Building and running the example
- make sure node-js and npm are installed.
- change to the cloned project folder and call `npm install`
- call `npm run build` to build the project (into the dist folder). The files in the dist folder may be hosted and used on any webserver.
- call `npm run dev` to automatically build and host the project on port `8080` using webpack dev server.
