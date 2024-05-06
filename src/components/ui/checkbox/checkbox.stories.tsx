import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
  title: 'Components/Checkbox',
}

export default meta

// Utility function to render a checkbox with common behavior
function useCheckboxState(disabled = false, label?: string) {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  return {
    handleChange,
    isChecked,
    props: {
      disabled,
      label,
    },
  }
}

type Story = StoryObj<typeof meta>

export const Checkbox1: Story = {
  render: () => {
    const { handleChange, isChecked } = useCheckboxState()

    return <Checkbox checked={isChecked} onChange={handleChange} />
  },
}

export const CheckboxWithLabel: Story = {
  render: () => {
    const { handleChange, isChecked } = useCheckboxState(false, 'Check-box with label')

    return <Checkbox checked={isChecked} label={'Check-box with label'} onChange={handleChange} />
  },
}

export const DisabledCheckbox: Story = {
  render: () => {
    const { handleChange, isChecked } = useCheckboxState(true)

    return <Checkbox checked={isChecked} disabled onChange={handleChange} />
  },
}

export const DisabledCheckboxWithLabel: Story = {
  render: () => {
    const { handleChange, isChecked } = useCheckboxState(true, 'Check-box with label')

    return (
      <Checkbox
        checked={isChecked}
        disabled
        label={'Check-box with label'}
        onChange={handleChange}
      />
    )
  },
}
