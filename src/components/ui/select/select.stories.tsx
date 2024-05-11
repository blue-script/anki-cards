import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/components/ui/select/select'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const availableOptions = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']

export type Option = (typeof availableOptions)[number]

export const Select1: Story = {
  args: {
    label: 'select-box',
    options: availableOptions,
    placeholder: 'Select-item',
  },
}

export const Select2: Story = {
  args: {
    disabled: true,
    label: 'select-box',
    options: availableOptions,
    placeholder: 'Select-item',
  },
}
