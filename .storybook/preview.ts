import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '../src/shared/styles/index.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
  },
}

export default preview
