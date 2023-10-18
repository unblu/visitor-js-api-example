# Unblu Embedded App Component React Demo

This example shows how to integrate the Unblu Embedded App Component into a React web application.

**Note:** *To guarantee compatibility, always use the same version of the Unblu Embedded App Component as the version of the Unblu Collaboration Server it is running against.*

For more information about the Unblu Embedded App Component see its [documentation](https://www.unblu.com/en/docs/latest/reference/unblu-embedded-js-api/).

## How it works
There are several steps required to integrate the Unblu Embedded App Component into a React project:

### Adding the dependency
First, add the Unblu Embedded App Component to the project as a dependency by adding `@unblu/embedded-app-component` to the [package.json](package.json) file.

### Adding support for the Unblu component
As the Unblu Embedded App is built as a WebComponent (a custom `HTMLElement`) which is an unknown component in the React system, you have to let React know that it exists.
This is done in the [typedef](./src/typedefs.ts) file.
This allows you to use the `<unblu-embedded-app>` in the `render` function.

This step isn´t required if you're using JavaScript instead of TypeScript.

### Using the Unblu component in the template and binding attributes
In your App component's [render function](./src/App.tsx#L46), add the custom `<unblu-embedded-app>` component.
Any attribute supported by the Embedded App Component can be dynamically set using React's standard bindings.

### Listening to Unblu custom events
Custom event listeners have to be added through the API as the Unblu Embedded App Component doesn't expose `on*` properties.
To do so, add a reference to the Unblu element using the `ref` attribute.
You can then access the reference in the `componentDidMount()` callback.

### Using the additional API
In addition to adding event listeners, it is possible to access the full API provided by the Unblu Embedded App Component as can be seen in the `componentDidMount()` callback.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:3000`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

