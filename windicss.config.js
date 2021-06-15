import { defineConfig } from 'vite-plugin-windicss'
import colors from 'windicss/colors'

export default defineConfig({
  extract: {
    include: ['./**/*.html', './**/*.xht', './**/*.ma', 'index.html'],
  },
  theme: {
    colors: {
      white: '#fff',
      ...colors,
    },
    boxShadow: {
      search: '0 1px 6px rgb(32 33 36 / 28%)',
      lucky: '0 1px 1px rgb(0 0 0 / 10%)',
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      search: '#dfe1e5',
    }),
  },
})
