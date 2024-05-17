import type { Meta, StoryObj } from '@storybook/react'

import { Layout } from '@/shared'

const meta = {
  component: Layout,
  tags: ['autodocs'],
  title: 'Components/Layout',
} satisfies Meta<typeof Layout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
