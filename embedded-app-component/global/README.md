# Simple integration of Unblu Embedded App Component using only HTML

This example shows how to integrate the Unblu Embedded Component App into a website without the need for any JavaScript code, using only HTML.

For more information about the Unblu Embedded App Component see its [documentation](https://www.unblu.com/en/docs/latest/reference/unblu-embedded-js-api/).

## Adapting the example to your environment
In the [index.html](./index.html)  file, you will find a `<script>` and an `<unblu-embedded-app>` tag.
To make this example work in your environment, you must make some changes.
The changes required vary depending on whether you're using the Unblu Cloud or an on-premises installation.

### Unblu Cloud
Replace the value of the `api-key` attribute of the `<unblu-embedded-app>` with your API key.
You can find your API key under `Account Management Page -> API Keys`.

### On-premises installation
Replace the `unblu.cloud` origin in the `<script>` tag with the origin you are hosting Unblu from.
Depending on your integration, you may also have to change the API Key.

## Running the example
This example does not have to be built.
The files can simply be served with a static file server.

To do so first install the dependencies:
```bash
npm install
```
Then enter
```bash
npm run serve
```
After that you will be able to access the [index.html](./index.html) file through http://127.0.0.1:8080.
