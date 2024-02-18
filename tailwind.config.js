/** @type {import('tailwindcss').Config} */
import daisy from 'daisyui'

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const plugins = [daisy];

export const theme = {
  extend: {
    flex: {
      '2': '2 2 0%'
    }
  },
};

export const daisyui = {
  themes: ['lemonade']
}