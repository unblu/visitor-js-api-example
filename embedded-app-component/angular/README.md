# Unblu Embedded App Component Angular Demo

This example shows how to integrate the Unblu Embedded App Component into an Angular-based web application.

**Note:** *To guarantee compatibility, always use the same version of the Unblu Embedded App
Component as the version of the Unblu Collaboration Server it is running against.*

For more information about the Unblu Embedded App Component see
its [documentation](https://www.unblu.com/en/docs/latest/reference/unblu-embedded-js-api/).

## How it works

There are several steps required to integrate the Unblu Embedded App Component into an Angular project:

### Adding the dependency
First, add the Unblu Embedded App Component to the project as a dependency by adding `@unblu/embedded-app-component` to the [package.json](package.json) file.

### Enabling custom web components

As the Unblu Embedded App is built as a WebComponent (a custom `HTMLElement`), you must enable
the `CUSTOM_ELEMENTS_SCHEMA` in the [module file](./src/app/app.module.ts) so you can use non-angular components in
your templates.

### Adding the Unblu component to the template

In your app component's [template file](./src/app/app.component.html), add the custom `<unblu-embedded-app>` component.

### Binding attributes and events

In the [template file](./src/app/app.component.html), you can set your custom attributes and add event listeners.
Additionally, add an ID using the `#` syntax so you can access the element in the next step.

### Accessing the app element from the component

Lastly, in your app's [component file](./src/app/app.component.ts), add the fields that will be used for the attributes of the Embedded App Component.
Also add the listener functions that will be called when the `UnbluEmbeddedAppElement` emits its events, and call the API of the `UnbluEmbeddedAppElement` from within Angular's `ngAfterViewInit`
method.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

