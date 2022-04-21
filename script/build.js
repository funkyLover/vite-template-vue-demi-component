const path = require('path')
const { build } = require('vite')
const _ = require('lodash');
const mode = process.argv.pop();

const vue2Comps = ['Button']
const vue3Comps = ['Button']
const mix = ['RenderButton'];

const entryDir = path.resolve(__dirname, '../src')
const outDir = path.resolve(__dirname, '../dist')

/** @type import('vite/dist/node/index').UserConfigExport */
const baseConfig = {
  configFile: false,
  publicDir: false,
  plugins: [],
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  build: {
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ["vue", "vue-demi"],
      output: {
        globals: {
          vue: "Vue",
          "vue-demi": "vueDemi",
        },
      },
    }
  },
};

const buildAll = async () => {
  const config = _.cloneDeep(baseConfig);
  if (mode === 'vue3') {
    const vue = require('@vitejs/plugin-vue');
    const vueJsx = require('@vitejs/plugin-vue-jsx');
    config.plugins = [vue(), vueJsx()];
    config.build = {
      ...config.build,
      minify: false,
      outDir: path.resolve(outDir, 'v3'),
      lib: {
        entry: path.resolve(entryDir, 'main.vue3.ts'),
        name: 'vc',
        fileName: (format) => `index.${format}.js`,
      }
    }
  }

  if (mode === 'vue2') {
    const vue2 = require('vite-plugin-vue2');
    const scriptSetup = require('unplugin-vue2-script-setup/vite');
    config.plugins = [vue2.createVuePlugin(), scriptSetup.default()];
    config.build = {
      ...config.build,
      minify: false,
      outDir: path.resolve(outDir, 'v2'),
      lib: {
        entry: path.resolve(entryDir, 'main.vue2.ts'),
        name: 'vc',
        fileName: (format) => `index.${format}.js`,
      }
    }
  }

  await build(config);
}

const buildSplit = async () => {
  const config = _.cloneDeep(baseConfig);
  let comps = [];
  if (mode === 'vue3') {
    const vue = require('@vitejs/plugin-vue');
    const vueJsx = require('@vitejs/plugin-vue-jsx');
    config.plugins = [vue(), vueJsx()];
    config.build.outDir = path.resolve(outDir, 'v3/components');
    comps = vue3Comps;
  }

  if (mode === 'vue2') {
    const vue2 = require('vite-plugin-vue2');
    const scriptSetup = require('unplugin-vue2-script-setup/vite');
    config.plugins = [vue2.createVuePlugin(), scriptSetup.default()];
    config.build.outDir = path.resolve(outDir, 'v2/components');
    comps = vue2Comps;
  }

  const buildComps = comps.map(compPath => {
    const subConfig = _.cloneDeep(config);
    subConfig.build.outDir = path.resolve(subConfig.build.outDir, compPath);
    subConfig.build.lib = {
      entry: path.resolve(entryDir, 'components', compPath, `${mode}.ts`),
      name: compPath,
      fileName: (format) => `${compPath}.${format}.js`,
    }

    return build(subConfig);
  });

  const buildMix = mix.map(compPath => {
    const subConfig = _.cloneDeep(config);
    subConfig.build.outDir = path.resolve(subConfig.build.outDir, compPath);
    subConfig.build.lib = {
      entry: path.resolve(entryDir, 'components', compPath, `index.ts`),
      name: compPath,
      fileName: (format) => `${compPath}.${format}.js`,
    }

    return build(subConfig);
  });

  await Promise.all([ ...buildComps, ...buildMix ])
}

buildAll();
buildSplit();
