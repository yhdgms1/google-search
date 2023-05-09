import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import { vitePlugin as malinaPlugin } from "malinajs-unplugin";
import { hash } from "ohash";

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
      modulePreload: {
        polyfill: false
      },
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          manualChunks: undefined,
        },
      },
    },
    css: {
      modules: {
        generateScopedName: (name, filename) => {
          const hashed = hash(name + filename);

          return mode === "development" ? `${name}_${hashed}` : `_${hashed}`;
        },
      },
    },
  };
});
