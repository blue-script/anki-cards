import type { Meta, StoryObj } from '@storybook/react'

import {
  Edit2,
  LogOut,
  MoreVerticalOutline,
  PersonOutline,
  PlayCircleOutline,
  Trash,
} from '@/assets/icons'
import { Dropdown } from '@/components/ui/dropdown/dropdown'
import { Typography } from '@/components/ui/typography'

import profileImage from '../../../assets/img/default-profile.png'

const meta: Meta<typeof Dropdown.Root> = {
  component: Dropdown.Root,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#000000' }],
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Dropdown',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger asChild>
        <MoreVerticalOutline />
      </Dropdown.Trigger>
      <Dropdown.Content align={'end'}>
        <Dropdown.Item>
          <PlayCircleOutline />
          <Typography as={'span'} color={'light'} option={'caption'}>
            Learn
          </Typography>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>
          <Edit2 />
          <Typography as={'span'} color={'light'} option={'caption'}>
            Edit
          </Typography>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>
          <Trash />
          <Typography as={'span'} color={'light'} option={'caption'}>
            Delete
          </Typography>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
}

export const Profile: Story = {
  render: () => (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger asChild>
        <img alt={'profile image'} src={profileImage} />
      </Dropdown.Trigger>
      <Dropdown.Content align={'end'} sideOffset={3}>
        <Dropdown.Label>
          <img alt={'profile image'} src={profileImage} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography as={'span'} color={'light'} option={'caption'}>
              Name
            </Typography>
            <Typography as={'span'} color={'light'} option={'caption'}>
              email@example.com
            </Typography>
          </div>
        </Dropdown.Label>
        <Dropdown.Separator />
        <Dropdown.Item>
          <PersonOutline />
          <Typography as={'span'} color={'light'} option={'caption'}>
            My Profile
          </Typography>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>
          <LogOut />
          <Typography as={'span'} color={'light'} option={'caption'}>
            Sign Out
          </Typography>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
}
