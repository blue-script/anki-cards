import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/components/ui/checkbox'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Checkbox1: Story = {
  args: {},
}

export const CheckboxWithLabel: Story = {
  args: {
    label: 'Checkbox with Label',
  },
}

export const DisabledCheckbox1: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledCheckbox1WithLabel: Story = {
  args: {
    disabled: true,
    label: 'Disabled Checkbox with Label',
  },
}
