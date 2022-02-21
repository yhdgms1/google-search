import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import { vitePlugin as malinaPlugin } from "malinajs-unplugin";
import { murmurHashV3 } from "murmurhash-es";

export default defineConfig(({ mode }) => {
  const DEV = mode === "development";

  return {
    plugins: [
      malinaPlugin({
        debugLabel: DEV,
      }),
      viteSingleFile(),
      createHtmlPlugin({
        minify: true,
        entry: "src/main.ts",
      }),
    ],
    build: {
      minify: "terser",
      target: ["chrome64"],
      polyfillModulePreload: false,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          manualChunks: null,
        },
      },
    },
    css: {
      modules: {
        generateScopedName: (name, filename, css) => {
          const hash = murmurHashV3(name + filename, 0x9747b28c).toString(36);

          return mode === "development" ? `${name}_${hash}` : `_${hash}`;
        },
      },
    },
  };
});
