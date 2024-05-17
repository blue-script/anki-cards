import type { Meta, StoryObj } from '@storybook/react'

import { LinearProgress } from '@/shared'

const meta: Meta<typeof LinearProgress> = {
  component: LinearProgress,
  tags: ['autodocs'],
  title: 'Components/LinearProgress',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isLoading: true,
  },
}
