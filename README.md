# mph-sdk-integration-vuejs

This template should help get you started developing with **MorphCast SDK** and Vue 3 in Vite.

## Getting started

Firstly, [generate a license key](https://www.morphcast.com/sdk-licence-request/) for MorphCast SDK and insert into the configuration snippet. 

You can find the configuration of the MorphCast SDK, under:

* `src/morphcast-ai-sdk/ai-sdk-loader.js`

The **start()** / **stop()** controls of the MorphCast SDK are inside the Landing View:  

* `src/views/LandingView.vue`

All the ready-to-use components binded to the specific modules of the MorphCast SDK are under:

* `src/components/`

You can find the latest [documentation of the MorphCast SDK, here](https://ai-sdk.morphcast.com/latest/index.html).

----

# Vue 3 instructions

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
