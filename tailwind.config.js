/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
const withMT = require('@material-tailwind/react/utils/withMT')
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        header: '#2A2A2A',
        primary: '#EE4D2D'
      },
    },
    fontFamily: {
      sans: ['SFProDisplay-Regular', 'Helvetica', 'Arial', 'sans-serif']
    }
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        },
        '.arrow-hide': {
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            'margin': 0
          },
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            'margin': 0
          }
        }
      })
    })
  ]
})
