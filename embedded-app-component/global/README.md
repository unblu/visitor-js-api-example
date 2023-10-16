# Simple integration of Unblu Embedded App Component only using HTML

This example shows how to integrate the Unblu Embedded Component App into a website only using HTML without the need of any JavaScript code.

For more information about the Unblu Embedded App Component see its [documentation](https://www.unblu.com/en/docs/latest/reference/unblu-embedded-js-api/).

## Adapting the example to your environment
When looking into the [index.html](./index.html) you will find a `<script>` and an `<unblu-embedded-app>` tag.
In order to make this example work in your environment some changes have to be done.
Depending on if you are using the Unblu cloud or an on premises installation chose your use case and follow the steps there:

### Unblu cloud
When running on the Unblu cloud replace the value of the `api-key` attribute of the `<unblu-embedded-app>` from `MZsy5sFESYqU7MawXZgR_w` with your API key which you can find under `Account Management Page -> API Keys`

### On premises
When running an on premises installation replace the `unblu.cloud` origin in the `<script>` tag with the origin you are hosting Unblu from. Depending on your integration, the API Key may also have to be changed.

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
