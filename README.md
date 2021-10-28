# VNSOS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Development run with HMR (Hot Module Replacement)

Run `npm run hmr` or `ng serve --configuration hmr`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Dependencies

- [Angular Material](https://material.angular.io/) - An enterprise-class UI design components for Angular applications.

## Folders

- `src/app/core` - This module is for classes used by file `app.module.ts`. Resources which are always loaded such as route guards, HTTP interceptors, and application level services.
- `src/app/modules` - The module directory contains a collection of modules have its own routing which is a `loadChildren` route resource defined in the `AppRoutingModule`.
- `src/app/shared` - The shared module contains classes and resources which are used in more than one dynamically loaded module. By always loading with the application the shared components are ready whenever a module requests them.

## Release using Github Action
- Go to `Action` tab
- Choose `release` workflow
- Click on `Run workflow`
- Fill in the release tag name (ie, v1.0.0)
- Click on `Run workflow`
- After the action is finished successfully, the docker image will be pushed to https://github.com/orgs/sos-hub-vn/packages/container/package/sos-website

<img width="1336" alt="Screen Shot 2021-09-12 at 2 55 07" src="https://user-images.githubusercontent.com/7227377/132956913-4d065823-22d4-4729-93df-9ff9facf8e4c.png">

- Choose `publish` workflow
- Click on `Run workflow`, fill in the release tag name (ie, v1.0.0) and it will be published to k8s on Vinacis

