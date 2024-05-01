import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider } from '@/components/ui/slider/slider'

const meta = {
  component: Slider,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [values, setValues] = useState([8, 23])
    const valueChangeHandler = (value: number[]) => {
      console.log('New Slider Values:', value)
      setValues(value)
    }

    return <Slider max={30} min={7} onValueChange={valueChangeHandler} value={values} />
  },
}
