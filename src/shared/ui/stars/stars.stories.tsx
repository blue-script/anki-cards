import type { Meta, StoryObj } from '@storybook/react'

import { Stars } from '@/shared'

const meta = {
  component: Stars,
  parameters: {},
  tags: ['autodocs'],
  title: 'Components/Stars',
} satisfies Meta<typeof Stars>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    grade: 3,
  },
}
