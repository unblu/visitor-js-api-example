# Integrating Unblu Floating JS API as an ES module library

This example shows how to integrate the Unblu Floating JS API into a JS project that is built and bundled with *webpack*.
The `unblu-visitor-api` has been added as an *npm* dependency as can be seen in the `dependencies` section of the [package.json](./package.json) file.

**Note:** *To guarantee compatibility, always use the same version of the Unblu Visitor JS API as the version of the Unblu Collaboration Server it is running against.*

For more information about the Unblu Floating JS API see its [documentation](https://www.unblu.com/en/docs/latest/reference/unblu-floating-js-api/).


## Building and running the example
- Make sure node-js and npm are installed.
- Change to the cloned project folder and call `npm install`.
- Call `npm run build` to build the project into the `dist` folder. The files in the `dist` folder may be hosted and used on any web server.
- Call `npm run dev` to automatically build and host the project on port `8080` using the webpack dev server.
