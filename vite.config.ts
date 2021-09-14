import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { minifyHtml } from 'vite-plugin-html'
import { default as malinaPlugin } from 'malinajs/malina-rollup'
import { default as windiCSSPlugin } from 'vite-plugin-windicss'
import { default as inspectPlugin } from 'vite-plugin-inspect'

export default defineConfig(({ mode }) => {

  const DEV = mode === 'development'

  return {
    plugins: [
      malinaPlugin({
        extension: ['ma', 'xht'],
        displayVersion: false,
      }),
      windiCSSPlugin({
        scan: {
          fileExtensions: ['html', 'ma', 'xht'],
        },
      }),
      !DEV && viteSingleFile(),
      !DEV && minifyHtml(),
      inspectPlugin() 
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
  }
})
