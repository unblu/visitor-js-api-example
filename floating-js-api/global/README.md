# Direct integration of bundled Floating JS API in the global window space

This example shows how to integrate the Unblu Floating JS API into a website, loading the bundled file from the Unblu Collaboration Server (either Unblu Cloud or an on-premises installation) and accessing the API via the global `window.unblu.api` space.

For more information about the Unblu Floating JS API see its [documentation](https://www.unblu.com/en/docs/latest/reference/unblu-floating-js-api/).

## IDE integration

In order to benefit from IDE features like code completion (intellisense) and type checking, the example includes the APIs typedefs which may be found in the `typedefs` folder. This activates full IDE support for both VS Code and WebStorm.
To make sure you have the latest version, copy the typedefs following the steps in the [global installation guide](https://www.unblu.com/en/docs/latest/reference/unblu-floating-js-api/#global-scope).

## Adapting the example to your environment
When looking into the [index.html](./index.html) several `<script>` tags can be found.
You have to make some changes to make this example work in your environment.
The changes vary depending on whether you're using the Unblu Cloud or an on-premises installation.

### Unblu Cloud
Replace the API Key `MZsy5sFESYqU7MawXZgR_w` with your API key.
You can find your API key under `Account Management Page -> API Keys`.

### On-premises
Replace the `unblu.cloud` origin with the origin you are hosting Unblu from.

## Running the example
This example does not have to be built.
The files can simply be served with a static file server.

To do so, first install the dependencies:
```bash
npm install
```
Then enter
```bash
npm run serve
```
After that you will be able to access the [index.html](./index.html) file through http://127.0.0.1:8080.
