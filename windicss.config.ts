import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'media',
  extract: {
    include: ['./**/*.html', './**/*.xht', './**/*.ma', './*.html'],
  },
  theme: {
    extend: {
      colors: {
        'google-dark': '#202124',
        'google-dark-hover': '#303134'
      }
    }
  },
})
