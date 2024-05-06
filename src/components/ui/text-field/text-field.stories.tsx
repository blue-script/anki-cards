import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { TextField } from './'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Input: Story = {
  args: {},
}

export const Password: Story = {
  args: {
    variant: 'password',
  },
}

export const Search: Story = {
  args: {
    variant: 'search',
  },
  render: args => {
    const [value, setValue] = useState('')

    return (
      <TextField
        clear={() => setValue('')}
        onChange={e => setValue(e.currentTarget.value)}
        value={value}
        variant={args.variant}
      />
    )
  },
}

export const InputFullWidth: Story = {
  args: {
    fullWidth: true,
  },
}
export const PasswordInputFullWidth: Story = {
  args: {
    fullWidth: true,
    variant: 'password',
  },
}
export const SearchInputFullWidth: Story = {
  args: {
    fullWidth: true,
    variant: 'search',
  },
}
export const InputError: Story = {
  args: {
    errorMessage: 'error',
  },
}

export const PasswordError: Story = {
  args: {
    errorMessage: 'error',
    variant: 'password',
  },
}

export const SearchError: Story = {
  args: {
    errorMessage: 'error',
    variant: 'search',
  },
}

export const FullWidthError: Story = {
  args: {
    errorMessage: 'error',
    fullWidth: true,
  },
}
export const InputDisabled: Story = {
  args: {
    disabled: true,
  },
}

export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    variant: 'password',
  },
}

export const SearchDisabled: Story = {
  args: {
    disabled: true,
    variant: 'search',
  },
}

export const FullWidthDisabled: Story = {
  args: {
    disabled: true,
    fullWidth: true,
  },
}
