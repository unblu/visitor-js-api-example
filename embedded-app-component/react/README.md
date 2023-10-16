# Unblu Embedded App Component React Demo

This example shows how to integrate the Unblu Embedded App Component into a React web application.

**Note:** *In order to guarantee compatibility, make sure you always use the same version of the Unblu Embedded App Component as the version of the Unblu collaboration server it is runing against.*

For more information about the Unblu Embedded App Component see its [documentation](https://www.unblu.com/en/docs/latest/reference/unblu-embedded-js-api/).

## How it works
In order to use the Unblu Embedded App Component in a React project a couple of steps have to be done:

### Adding the dependency
First the Unblu Embedded App Component is added to the project as a dependency by adding the `@unblu/embedded-app-component` to the [package.json](package.json) file.

### Adding support for the Unblu component
As the Unblu Embedded App is built as a WebComponent (a custom `HTMLElement`) which is an unknown component in the React system, we have to let React know that it exists which we do in the [typedef](./src/typedefs.ts).
This allows us to use the `<unblu-embedded-app>` in the `render` function.

If you are using JavaScript instead of TypeScript this step is not needed.

### Using the Unblu component in the template and binding attributes
In our App component's [render function](./src/App.tsx#L46) we add our custom `<unblu-embedded-app>` component.
Any attribute supported by the the Embedded App Component can be dynamically set using React's standard bindings.

### Listening to Unblu Custom Events
Custom event listeners have to be added through the API as the Unblu Embedded App Component doesn't expose `on*` properties.
In order to do so we add a reference to the Unblu element using the `ref` attribute which we can later access in the `componentDidMount()` callback.

### Using the additional API
Additional to adding event listeners it is possible to access the full API provided by the Unblu Embedded App Component as can be seen in the `componentDidMount()` callback.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:3000`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

