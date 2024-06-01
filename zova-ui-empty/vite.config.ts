// Plugins
import Vue from '@vitejs/plugin-vue';

// Utilities
import { defineConfig, mergeConfig } from 'vite';
import { getAppMode, getFlavor } from 'zova-vite';
import { CabloyConfigMeta } from 'zova';
import { generateCabloyViteMeta } from 'zova-vite';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const flavor = getFlavor();
  const appMode = getAppMode();
  const configMeta: CabloyConfigMeta = {
    flavor,
    mode,
    appMode,
  };
  const configOptions = {
    appDir: process.cwd(),
    runtimeDir: '.zova',
    cabloyManualChunk: {
      debug: false,
      vendors: [],
    },
  };
  // cabloyViteMeta
  const cabloyViteMeta = await generateCabloyViteMeta(configMeta, configOptions);
  // plugins
  const plugins = [Vue({})];
  for (const plugin of cabloyViteMeta.vitePlugins) {
    const pluginFn = plugin[1];
    const pluginOptions = plugin[2];
    plugins.push(pluginFn(pluginOptions));
  }
  // viteConfig
  const viteConfig = mergeConfig(cabloyViteMeta.viteConfig, {
    plugins,
  });
  return viteConfig;
});
