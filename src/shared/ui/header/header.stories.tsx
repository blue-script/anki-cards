import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/shared'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

const userStoryData = {
  avatar: null,
  created: '',
  email: 'test@test.gmail.com',
  id: '123-456-789',
  isEmailVerified: false,
  name: 'testAcc',
  updated: 'string',
}

export const Default: Story = {
  args: { data: userStoryData },
}
