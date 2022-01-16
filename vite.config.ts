import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { minifyHtml } from "vite-plugin-html";
import { vitePlugin as malinaPlugin } from "malinajs-unplugin";
import { default as inspectPlugin } from "vite-plugin-inspect";

export default defineConfig(({ mode }) => {
  const DEV = mode === "development";

  return {
    plugins: [
      malinaPlugin({
        debugLabel: DEV,
      }),
      viteSingleFile(),
      minifyHtml(),
      inspectPlugin(),
    ],
    build: {
      target: ["chrome64"],
      polyfillModulePreload: false,
      cssCodeSplit: false,
      rollupOptions: {
        inlineDynamicImports: true,
        output: {
          manualChunks: () => "everything.js",
        },
      },
    },
  };
});
