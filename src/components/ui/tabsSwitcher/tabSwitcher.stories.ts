import type { Meta, StoryObj } from '@storybook/react'

import { action } from '@storybook/addon-actions'

import { TabSwitcher } from './'

const meta = {
  args: {
    label: 'Select a tab',
    onValueChange: () => action('Tab changed:'),
    tabs: [
      { text: 'Tab 1', value: 'tab1' },
      { text: 'Tab 2', value: 'tab2' },
      { text: 'Tab 3', value: 'tab3' },
      { disabled: true, text: 'Tab 4', value: 'tab4' },
    ],
    value: 'Tab',
  },

  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/Tab Switcher',
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
