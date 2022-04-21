/// <reference types="vitest" />
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  /** @type import('vite/dist/node/index').UserConfigExport */
  const config = {
    plugins: [],
    optimizeDeps: {
      exclude: ["vue-demi"],
    },
    test: {
      globals: true,
      environment: 'jsdom'
    }
  };

  // mode = 'vue2' | 'vue3'
  if (mode === 'vue3') {
    const vue = (await import('@vitejs/plugin-vue')).default;
    config.plugins.push(vue())
    config.test.include = ['test/**/v3.test.ts'];
  }

  if (mode === 'vue2') {
    const vue2 = (await import('vite-plugin-vue2')).default;
    const scriptSetup = (await import('unplugin-vue2-script-setup/vite')).default;
    config.plugins.push(vue2.createVuePlugin())
    config.plugins.push(scriptSetup())
    config.test.include = ['test/**/v2.test.ts'];
  }

  return config;
})
