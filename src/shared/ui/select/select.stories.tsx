import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/shared/ui/select'

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
    label: 'Select-box',
    options: availableOptions,
    placeholder: 1 || 'Select',
  },
}

export const Select2: Story = {
  args: {
    disabled: true,
    label: 'Select-box',
    options: availableOptions,
    placeholder: 1 || 'Select',
  },
}
