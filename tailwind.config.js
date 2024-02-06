import * as daisyuiplugin from 'daisyui'
/** @type {import('tailwindcss').Config} */
export const content =  [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
export const theme = {
  extend: {},
};
export const plugins = [daisyuiplugin];
export const daisyui = {
  themes: ['lemonade']
}

