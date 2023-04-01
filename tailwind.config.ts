import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#9061f9',
          secondary: '#e74694',
          accent: '#06b6d4',
          normal: '#111111',
          'base-100': '#1f1f1f',
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        display: ['Rubik Bubbles', 'serif'],
      },
    },
  },
} as Partial<Config>;
