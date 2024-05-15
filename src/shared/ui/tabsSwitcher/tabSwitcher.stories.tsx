import { useState } from 'react'

import { Meta } from '@storybook/react'

import { TabSwitcher } from './'

const meta = {
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/Tab Switcher',
} satisfies Meta<typeof TabSwitcher>

export default meta

const tabs = [
  { text: 'Switcher 1', value: 'Tab 1' },
  { text: 'Switcher 2', value: 'Tab 2' },
  { text: 'Switcher 3', value: 'Tab 3' },
  { disabled: true, text: 'Disabled', value: 'disabled' },
]

export const Default = {
  render: () => {
    const [value, setValue] = useState('Tab 2')

    return (
      <div>
        <TabSwitcher
          label={'TabSwitcher'}
          onValueChange={value => setValue(value)}
          tabs={tabs}
          value={value}
        />
        <p style={{ marginTop: '36px' }}>{value}</p>
      </div>
    )
  },
}
