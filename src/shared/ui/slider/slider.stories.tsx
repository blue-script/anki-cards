import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider } from '@/shared/ui/slider/slider'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Number of cards',
    max: 20,
    min: 7,
    value: [8, 23],
  },
  render: args => {
    const [values, setValues] = useState(args.value)
    const valueChangeHandler = (value: number[]) => {
      setValues(value)
    }

    return (
      <Slider
        label={args.label}
        max={args.max}
        min={args.min}
        onValueChange={valueChangeHandler}
        value={values}
      />
    )
  },
}
