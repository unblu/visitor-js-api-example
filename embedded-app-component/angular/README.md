# Unblu Embedded App Component Angular Demo

This example shows how to integrate the Unblu Embedded App Component into an Angular based web application.

**Note:** *In order to guarantee compatibility, make sure you always use the same version of the Unblu Embedded App
Component as the version of the Unblu collaboration server it is runing against.*

For more information about the Unblu Embedded App Component see
its [documentation](https://www.unblu.com/en/docs/latest/reference/unblu-embedded-js-api/).

## How it works

In order to integrate the Unblu Embedded App Component in an Angular project a couple of steps have to be done:

### Adding the dependency
First the Unblu Embedded App Component is added to the project as a dependency by adding the `@unblu/embedded-app-component` to the [package.json](package.json) file.

### Enabling custom web components

As the Unblu Embedded App is built as a WebComponent (a custom `HTMLElement`), we have to enable
the `CUSTOM_ELEMENTS_SCHEMA` in the [module file](./src/app/app.module.ts) allowing us to use non-angular components in
your templates.

### Adding the Unblu component to the template

In our App component's [template file](./src/app/app.component.html) we add our custom `<unblu-embedded-app>` component.

### Binding attributes and events

In the [template file](./src/app/app.component.html) we can set our custom attributes as well as add event listeners. Additionally, we are adding an ID using the `#`
syntax, so we can access the element and use its APIs in the next step.

### Accessing the app element from the component

Lastly in our App [component file](./src/app/app.component.ts) we add the fields that will be used of our attributes as
well as the listener functions and call the API of the `UnbluEmbeddedAppElement` from with Angular's `ngAfterViewInit`
method.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

