import type { Meta, StoryObj } from '@storybook/react'

import avatar from '@/assets/img/default-avatar-large.png'
import { Profile } from '@/components/profile/profile'
import { action } from '@storybook/addon-actions'

const meta = {
  args: {
    avatar: avatar,
    email: '&johnson@gmail.com',
    name: 'Ivan',
    onAvatarChange: action('changeAvatar'),
    onLogout: action('logout'),
    onNameChange: action('changeName'),
  },
  component: Profile,
  tags: ['autodocs'],
  title: 'profile/PersonalInformation',
} satisfies Meta<typeof Profile>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
