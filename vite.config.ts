import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { minifyHtml } from 'vite-plugin-html'
import { default as malinaPlugin } from 'malinajs/malina-rollup'
import { default as windiCSSPlugin } from 'vite-plugin-windicss'

const DEV = process.env.MODE === 'dev'

export default defineConfig({
  plugins: [
    malinaPlugin({
      extension: ['ma', 'xht'],
      displayVersion: false,
      compact: true,
    }),
    windiCSSPlugin({
      scan: {
        fileExtensions: ['html', 'ma', 'xht'],
      },
    }),
    !DEV && viteSingleFile(),
    !DEV && minifyHtml(),
  ],
  build: {
    target: ['chrome64'],
    polyfillDynamicImport: false,
    cssCodeSplit: false,
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: () => 'everything.js',
      },
    },
  },
})
