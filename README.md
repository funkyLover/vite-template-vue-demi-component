# Vite + Vue 2 / 3 + Vue-demi

create your vue2/3 components lib with full development feature support~

## development

requires node v16 or higher.

```bash
npm i --legacy-peer-deps

npm run dev
```

## test

```bash
# for vue 2
npm run test:v2

# for vue3
npm run test:v3
```

## build

```bash
npm run build

# build preview
npm pack

# preview build for vue2
cd example/vue2 && npm i -S path/to/npm.pack.tgz && npm run dev

# preview build for vue3
cd example/vue3 && npm i -S path/to/npm.pack.tgz && npm run dev
```
