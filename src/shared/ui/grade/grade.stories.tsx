import type { Meta, StoryObj } from '@storybook/react'

import { Grade } from '@/shared'

const meta = {
  component: Grade,
  parameters: {},
  tags: ['autodocs'],
  title: 'Components/Stars',
} satisfies Meta<typeof Grade>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    grade: 3,
  },
}
