import type { Meta, StoryObj } from '@storybook/react'

import { action } from '@storybook/addon-actions'

import { RadioGroup } from './'

const meta = {
  args: {
    name: 'Group',
    value: 'RadioGroup',
  },

  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [],
  },
  render: () => {
    const options = [
      { label: 'Radio 1', value: '1' },
      { label: 'Radio 2', value: '2' },
      { label: 'Radio 3', value: '3' },
      { label: 'Radio 4', value: '4' },
      { label: 'Radio 5', value: '5' },
    ]

    return <RadioGroup onValueChange={action('Radio changed')} options={options} />
  },
}
export const Disabled: Story = {
  args: {
    options: [],
  },
  render: () => {
    const options = [
      { label: 'Radio 1', value: '1' },
      { label: 'Radio 2', value: '2' },
      { label: 'Radio 3', value: '3' },
      { label: 'Radio 4', value: '4' },
      { label: 'Radio 5', value: '5' },
    ]

    return <RadioGroup disabled onValueChange={action('Radio changed')} options={options} />
  },
}
export const Error: Story = {
  args: {
    options: [],
  },
  render: () => {
    const options = [
      { label: 'Radio 1', value: '1' },
      { label: 'Radio 2', value: '2' },
      { label: 'Radio 3', value: '3' },
      { label: 'Radio 4', value: '4' },
      { label: 'Radio 5', value: '5' },
    ]

    return (
      <RadioGroup
        errorMessage={'error'}
        onValueChange={action('Radio changed')}
        options={options}
      />
    )
  },
}
