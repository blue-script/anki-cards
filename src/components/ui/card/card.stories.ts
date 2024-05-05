import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/components/ui/card/card'

const meta = {
  component: Card,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const CardAsDiv: Story = {
  args: {
    as: 'div',
    children: 'Default Card',
    style: {
      height: '200px',
      padding: '30px',
      textAlign: 'center',
      width: '200px',
    },
  },
}
