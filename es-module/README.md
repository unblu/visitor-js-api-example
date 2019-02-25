# Integrating Unblu Visitor JS API as es-module library

This example shows how to integrate the Unblu Visitor JS API into a js project that is built and bundled with webstorm.
The `lib/unblu-visitor-api/` folder contains the extracted `visitor-api-lib-esm.zip` which can be downloaded from the local unblu installation or the cloud.

## Building and running the example
- make sure node-js and npm are installed.
- change to the cloned project folder and call `npm install`
- call `npm run build` to build the project (into the dist folder). The files in the dist folder may be hosted and used on any webserver.
- call `npm run dev` to automatically build and host the project using webpack-serve on port `1337`.
