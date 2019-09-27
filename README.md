[![Travis (.org)](https://img.shields.io/travis/thinktecture-labs/web-components-chat?style=for-the-badge)](https://travis-ci.org/thinktecture-labs/web-components-chat)
[![Demo](https://img.shields.io/website?label=demo&style=for-the-badge&url=https%3A%2F%2Ftt-web-components-chat-ng.azurewebsites.net%2F)](https://tt-web-components-chat-ng.azurewebsites.net/)

# Web Components Chat

A simple demo building a chat with various web components written in different frameworks.
The purpose of this demo is to showcase web components interaction of various frameworks, having inputs, outputs, changing data and how the system will react to all that. 

Additionally, that's currently missing, it shall also demo how to change styling of different components via [CSS Shadow Parts](https://www.w3.org/TR/css-shadow-parts-1/). That's on my todo list.

> Side note: The project is tested and developed with Chrome only. It may work in other browsers, but it has not been tested for functionality and styling.

## Frameworks

Currently, the following frameworks are used in this demo application.
Please have in mind, that the code written may not be best fit in each framework.

* [Angular](https://angular.io/)
* [React](https://reactjs.org/)
* [Vue](https://vuejs.org/)
* [Stencil](https://stenciljs.com/)
* [LitElement](https://lit-element.polymer-project.org/)
* [Native Web Components](https://www.webcomponents.org/) (that's not a framework, but web components written without a framework)

## Structure

The structure of the project is as following.

### `backend`

Contains the code of a little Node.js backend using [socket.io]() for the realtime communication. Additonally, it hosts a framework-less request handler for generating link previews for the application.

### `frontend/web-components`

Contains all the different web components written in each framework.
Please note, that some web components rely on other web components.
Refer to the _Setup_ part for instructions how to build the project. 
Also note, that for development purposes, each projects within the `web-components` folder can be started via `npm start`.
But this will not build the final web components for the given framework.

### `frontend/apps`

Within this folder the final apps will be implemented using the web components and using the framework-way of handling data.
Currently, the only app is written in Angular. 
React and Vue is also planned. 
Feel free to contribute. :-)

## Setup

This section explains how to setup the project and get everyhing to run.

### Common commands

Each individual project has a `npm start` and `npm run build-wc` command.
The first one will start the development environment of each web component.
The idea is to develop each web component in a sandbox environment and later build it for usage in other applications.

In some projects there may be a command `npm run wc` available.
This is the case when the web component itself uses other web components.
The command will copy the necessary files into the workspace of the individual project.

### Build Process

It's import to understand, how the build process currently works. 
As mentioned the command `npm run build-wc` will build a web component in each project.
The output of the build will be within each project.
The ouput is not yet usable for other `npm run wc` commands.

Additionally, in `frontend/package.json` another `npm run build-wc` command is found.
This command will build _all_ individual web component projects and _copy_ the build output into `frontend/dist`.
This folder is the source for all `npm run wc` commands.

### First time setup

For the initial setup, you should execute the `npm-i.sh` file.
It will install all node modules in each project.

Then, go to `frontend` and run `npm run build-wc`.
After that, go to one of the apps (e.g. `frontend/apps/ng-chat/app`) and execute `npm run wc`.
This will copy all the web components into the app, so the app can be build later.

### Workflow

For the workflow, you usually would `npm start` on of the apps (e.g. `frontend/apps/ng-chat-app`) and then `npm start` on of the web components you want to work on.
Note, all web component projects are hosted on their own port, so you could start the all if you want.
When you've done your changes to your web component, you'd `cd frontend` and run `npm run build-wc && (cd apps/ng-chat-app && npm run wc)`. 
The command like that will at first build all web components (in fact, you could build each one individually, just take a look at `frontend/package.json`) and then copy all components into the app. 

Currently, there is no `watch` job or something to do that automatically.
Depending on how you work, you would not need it, since the web components are developed within the own sandbox environment and defining an interface (e.g. HTML attributes). 
If done, then the web components are build and copied.