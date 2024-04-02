import * as daisyuiplugin from 'daisyui'
/** @type {import('tailwindcss').Config} */
export const content =  [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
export const theme = {
  extend: {
    flex: {
      '2': '2 2 0%'
    },
    borderRadius: {
      'daunKapas': '17% 83% 88% 12% / 14% 59% 41% 86%',
      'padi': '11% 89% 9% 91% / 5% 95% 5% 95% '
    }
  },
};
export const plugins = [daisyuiplugin];
export const daisyui = {
  themes: ['lemonade']
}

