import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button primary',
    disabled: false,
    variant: 'primary',
  },
}
export const PrimaryWithIcon: Story = {
  args: {
    children: 'Button primary',
    disabled: false,
    icon: true,
    variant: 'primary',
  },
}
export const PrimaryWithIconDisabled: Story = {
  args: {
    children: 'Button primary',
    disabled: true,
    icon: true,
    variant: 'primary',
  },
}
export const Secondary: Story = {
  args: {
    children: 'Button secondary',
    disabled: false,
    variant: 'secondary',
  },
}
export const SecondaryWithIcon: Story = {
  args: {
    children: 'Button secondary',
    disabled: false,
    icon: true,
    variant: 'secondary',
  },
}
export const SecondaryWithIconDisabled: Story = {
  args: {
    children: 'Button secondary',
    disabled: true,
    icon: true,
    variant: 'secondary',
  },
}
export const Tertiary: Story = {
  args: {
    children: 'Tertiary',
    disabled: false,
    variant: 'tertiary',
  },
}
export const TertiaryWithIcon: Story = {
  args: {
    children: 'Tertiary',
    disabled: false,
    icon: true,
    variant: 'tertiary',
  },
}
export const TertiaryWithIconDisabled: Story = {
  args: {
    children: 'Tertiary',
    disabled: true,
    icon: true,
    variant: 'tertiary',
  },
}
export const Link: Story = {
  args: {
    as: 'a',
    children: 'Link-button',
    disabled: false,
    href: 'https://www.google.com/',
    target: '_blank',
    variant: 'link',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
